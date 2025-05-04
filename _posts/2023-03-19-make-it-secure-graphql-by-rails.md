---
layout: post
title: Make it Secure, GraphQL by Rails
hero_height: is-small
date: 2023-03-19 01:04 +0900
---
These days, attacks on a web application becomes more and more common.
Every web application should be protected to get rid of such attacks.
Ruby on Rails provides ways to make it secure out of the box.
Additionally, well-used gems in Rails world, such as Devise ([https://github.com/heartcombo/devise](https://github.com/heartcombo/devise)),
give us convenient ways to protect the Rails app.

However, when it comes to an API only web application, it's not straightforward.
For example, passing a token by meta tag won't work.
This memo is focusing on GraphQL API and about how to make it secure.

Versions:
- Ruby: 3.2.1
- Rails: 7.0.4.3


### Password Authentication

The most primitive idea to protect web application is adding a password authentication.
As we know, users who wants to modify resources on the web site should register themselves and
complete a login process by sending an id and credential combination to the web site.
The id and credential pair will be verified on the web application side.
Then, the logged in state will be maintained between the user and the web site.
With the logged in state, web application processes the resource update request and returns the result.
If not, an error message should be sent back to the user who tried.

The traditional web application would show the HTML login form, dropdown or sort for register and login.
Then, the web browser and application maintains the logged-in state by a session, cookie or hidden field in the HTML form.

The API only server should do what?
In general, the API server uses HTTP headers or explicit token exchanges.
For example, GraphQL API provides login mutation which returns a token after a successful verification.
The returned token should be added to an HTTP header to make successive mutations and/or queries.

At this moment, multiple techniques are out there, however, none is decisive for GraphQL API.
Sometime, REST API is used for login and register user since Devise gem works better with REST API.
Others do by GraphQL mutation API with the authentication implementation from scratch.

This memo mentions about a way to authenticate users by Global ID.

#### Global ID

The Global ID is "an app wide URI that uniquely identifies a model instance" as
described in [https://github.com/rails/globalid](https://github.com/rails/globalid).
The Global ID based authentication does two jobs below using Global ID as an uniquely identifiable value:
- create a user with the uniquely identifiable value
- locate a user based on the uniquely identifiable value

The Global ID authentication is explained in the YouTube video and GitHub repository below:
- YouTube: Getting started with GraphQL in Rails [https://www.youtube.com/watch?v=izgCaExV9Uo](https://www.youtube.com/watch?v=izgCaExV9Uo)
- GitHub: [https://github.com/phawk/coinfusion/tree/graphql_ruby_2](https://github.com/phawk/coinfusion/tree/graphql_ruby_2)

Let's add Global ID based authentication to the GraphQL API created in the previous post,
[Getting Started GraphQL Using Ruby on Rails](/2023/03/12/getting-started-graphql-using-ruby-on-rails.html).

##### Add Gems

The Global ID feature is provided by globalid gem.
The gem is pulled as an dependency of Action Text and Active Job.
When the GraphQL app was created in the previous blog post, those two were skipped.
So, the gem should be added manually.

Also, we need bcrypt gem, [https://github.com/bcrypt-ruby/bcrypt-ruby](https://github.com/bcrypt-ruby/bcrypt-ruby).
The bcrypt gem is used to create a password digest and provide user authentication feature.

To add those two gems, do below:
1. open Gemfile and uncomment bcrypt gem
2. run `bundle add globalid`

##### Update User Model

The User model should have a `password_digest` column to save a password digest.
The User model should never ever save a raw password in the database which is to avoid the actual password to be stolen.
This is a very basic security practice.

The password digest is a hashed value of salt and given password.
On Rails, the bcrypt gem is responsible to create the hashed value.
The bcrypt gem is a Ruby implementation of [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) password-hashing function.
Precisely, the bcrypt function creates a concatenated string of a hashing algorithm, cost, salt and checksum.
That sort of hashed value will be saved in the database instead of a raw password.

Let's create a migration to add password_digest column to user model.

```bash
$ rails g migration AddPasswordDigestToUsers
```

Edit the migration file and run the migration.
```ruby
# db/migrate/[DATE TIME]_add_password_digest_to_users.rb
class AddPasswordDigestToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_digest, :string
  end
end
```
```bash
$ rails db:migrate
```

The user model definition should be updated also.
```ruby
class User < ApplicationRecord
  attr_accessor :token

  has_secure_password

  has_many :posts, dependent: :destroy

  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }, presence: true
end
```

Since this is a GraphQL API, the authentication is token based.
Because of that, `attr_accessor :token`, is added.
The `has_secure_password` is to signal that the user should be authenticated, which is a provided feature by bcrypt gem.
The line, `validates :password, length: { minimum: 8 }, presence: true` is to require the password input.
The database won't have the password column, but still the model creation needs password.
For this reason, the password constraint is in the user model.

##### Update GraphQL Controller, Types and Mutations

The next step is GraphQL controller, type and mutation updates.
The first one is a graphql_controller update.
The changes in the controller are:
- add a private method, current_user, to locate a user based on Global ID using the token in the HTTP header.
- add a current_user entry in graphql context hash table.

```ruby
# app/controllers/graphql_controller.rb
class GraphqlController < ApplicationController

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: current_user
    }
    result = MiniBlogSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  def current_user
    header  = request.headers["AUTHORIZATION"]
    token = header&.gsub(/\AToken\s/, "")
    GlobalID::Locator.locate_signed(token, for: 'graphql')
  end
  # snip
  # ...
  # ...
end
```

The second update is the user_type.
The user_type is used for both query and mutation, so it should have password and token fields.
```ruby
# app/graphql/types/user_type.rb
module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :password, String, null: true
    field :token, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
```

The remaining updates are mutations.
The user registration and login mutations look like below:
```ruby
# app/graphql/mutations/user_register.rb
module Mutations
  class UserRegister < BaseMutation
    description "Register a new user"

    field :user, Types::UserType, null: false

    argument :email, String, required: true
    argument :password, String, required: true
    argument :first_name, String, required: false
    argument :last_name, String, required: false

    def resolve(**kwargs)
      user = ::User.new(**kwargs)
      if user.save
        user.token = user.to_sgid(expires_in: 6.hours, for: 'graphql')
        { user: user }
      else
        raise GraphQL::ExecutionError.new "Error creating user", extensions: user.errors.to_hash
      end
    end
  end
end
```
```ruby
# app/graphql/mutations/user_login.rb
module Mutations
  class UserLogin < BaseMutation
    description "Login an existing user"

    field :user, Types::UserType, null: false

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(email:, password:)
      user = User.find_by(email: email)
      if user&.authenticate(password)
        user.token = user.to_sgid(expires_in: 6.hours, for: 'graphql')
        { user: user }
      else
        raise GraphQL::ExecutionError.new "Error creating user", extensions: user.errors.to_hash
      end
    end
  end
end
```
The mutation_type needs an update to include UserRegister and UserLogin mutations.
Also, we don't need UserCreate mutation anymore, so delete it if it is there.
```ruby
# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :user_register, mutation: Mutations::UserRegister
    field :user_login, mutation: Mutations::UserLogin
    field :post_create, mutation: Mutations::PostCreate
  end
end
```

So far, the GraphQL API is able to provide user register and login feature.
The last piece is to create a post after the successful login.
To add the authentication feature to post creation mutation,
BaseMutation class is going to have two methods to check logged in state.
The GraphqlController already added the context[:current_user] parameter.
The the authenticate! method raises an exception if context[:current_user] is empty.

```ruby
module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    private

    def current_user
      context[:current_user]
    end

    def authenticate!
      if current_user.blank?
        raise GraphQL::ExecutionError.new "Authentication failed. Please log in."
      end
    end
  end
end
```

The PostCreate class will have one line of addition.
The resolve method gets `authenticate!` in its first line. That's it.
```ruby
# app/graphql/mutations/post_create.rb
module Mutations
  class PostCreate < BaseMutation
    description "Creates a new post"

    field :post, Types::PostType, null: false

    argument :user_id, Integer, required: true
    argument :title, String, required: true
    argument :content, String, required: true

    def resolve(**kwargs)
      authenticate!
      post = ::Post.new(**kwargs)
      raise GraphQL::ExecutionError.new "Error creating post", extensions: post.errors.to_hash unless post.save

      { post: post }
    end
  end
end
```

##### Make Queries

All are implemented.
It's time to try those.
Here, GraphQL client is Insomnia ([https://insomnia.rest/](https://insomnia.rest/))
since both request and response HTTP headers are visible and easy to edit.

The first GraphQL query is the user registration.
```graphql
mutation register {
	userRegister(input: {
		email: "finn.smith@example.com",
		password: "password!",
		firstName: "Finn",
		lastName: "Smith"
	}) {
		user {
			id
			email
			token
		}
	}
}
```
If the user is successfully registered, a tokenized signed Global ID will be returned.

<img src="/assets/img/insomnia-register-query.jpeg" alt="img: insomnia user register query">

The next is a login mutation.
```graphql
mutation login {
	userLogin(input: {
		email: "finn.smith@example.com",
		password: "password!"
	}) {
		user {
		    id
			email
			token
		}
	}
}
```
The login mutation also returns a tokenized signed Global ID.

<img src="/assets/img/insomnia-login-query.jpeg" alt="img: insomnia user login query">

The post create mutation needs HTTP header to complete successfully.
So, let's try without the token in the HTTP header to see it will fail.

```graphql
mutation post {
	postCreate(input: {
		userId: 9,
		title: "Hello, World!",
		content: "This is the first from Finn"
	}) {
		post {
			id
			title
			content
		}
	}
}
```

As expected, it failed without the token in the HTTP header

<img src="/assets/img/insomnia-post-failed.jpeg" alt="img: insomnia failed post query">

Then, set Authorization HTTP request header with the token returned from register or login mutation.

```
Authorization: Token BAh7CEkiCGdpZAY6BkVUSSIsZ2lk.......
```

Now, it succeeds.

<img src="/assets/img/insomnia-post-with-header.jpeg" alt="img: insomnia post with header">


### Code

The example Rails app code is on the GitHub repo.
Please see [https://github.com/yokolet/mini-blog](https://github.com/yokolet/mini-blog).
