---
layout: post
title: Application Development by Rails Action Cable
featured_image: empty-field-with-fuji.jpg
excerpt_separator: <!--more-->
hero_height: is-small
date: 2024-11-11 22:32 +0900
---
The previous two blog posts introduced WebSocket and how to implement a WebSocket application on Ruby on Rails.
This blog post digs deeper. It is a memo on creating a more realistic application by Action Cable.
<!--more-->

### Real-time application

As a real-time application, this post picks up a classic Tic-Tac-Toe game.
The game here adopts a multi-player and multi-board design.
Multiple players can join the game.
A single player can create or join multiple game boards.
The player can play multiple games in parallel.

When a player registers a player name, the name appears on all players' panels in real-time.
When a new board is created, its name appears on all players' panels in real-time as well.
Of course, the game progress is updated in real-time.

When a player clicks an unregister button or closes a window/tab,
the player's name disappears from all players' panels.

#### Code and Game Details

- GitLab: [https://gitlab.com/yokolet/action-cable-tictactoe](https://gitlab.com/yokolet/action-cable-tictactoe)
- GitHub: [https://github.com/yokolet/action-cable-tictactoe](https://github.com/yokolet/action-cable-tictactoe)


### Rails Side

On the Rails side, a connection and channels are main components for the application.
It depends on the application whether the connection should be implemented or used as is.
On the other hand, a channel need to be implemented to provide a specific service.

#### Connection

As the [Rails Guide](https://guides.rubyonrails.org/v8.0/action_cable_overview.html#server-side-components-connections)
explains, the main purpose of the connection (ApplicationCable::Connection) is an authentication and authorization.
However, ApplicationCable::Connection itself doesn't authenticate a user.
Its usage is to verify the already authenticated/authorized user so that channels can identify an individual user.

In the Tic-Tac-Toe application, an encrypted cookie is created when the application is requested for the first time.
- [app/controllers/home_controller.rb](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/app/controllers/home_controller.rb?ref_type=heads)

The encrypted cookie is verified in the WebSocket connection as a player id.
After successful verification, the user is identified by `current_player_id`.
- [app/channels/application_cable/connection.rb](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/app/channels/application_cable/connection.rb?ref_type=heads)

The key word, `identified_by` is provided by Rails, so we can use it without doing anything extra.


#### Channel

Application's main logic is implemented in a channel. The API document shows what methods are defined in
[ActionCable::Channel::Base](https://api.rubyonrails.org/classes/ActionCable/Connection/Base.html) class.
Among those, the application mostly implement a subscribe, unsubscribe, send or other methods to perform actions.

- `subscribe`: when a JavaScript client creates a channel, the subscribe method is called.
- `unsubscribe`: when a WebSocket connection is closed, the unsubscribe method is called.
- `perform action`: when a JavaScript client sends a payload, {action: "some_method", ...}, "some_method" is called to
perform the logic.

After performing the logic in the channel,
broadcast and transmit methods are used to send the result back from the Rails side to JavaScript client.

- broadcast: pushes the result to all subscribed JavaScript clients
- transmit: sends the result back to the only one JavaScript client who sends payload to the channel.

The Tic-Tac-Toe application uses 3 types of channels. The PlayerChannel would be a good example since it is simple.
- [app/channels/player_channel.rb](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/app/channels/player_channel.rb?ref_type=heads)

The PlayerChannel has a subscribe, unsubscribe, register, unregister, and heads_up methods.
- `subscribe`: using `stream_from` method, adds the client to the player_channel, then sends back the payload to the
client who tries to subscribe
- `unsubscribe`: after removing the player name of this connection, broadcasts the updated player list to all subscribed clients
- [perform action] `register`: adds a new player name to the player list and sends back the payload to the client
who tries to register. In this application, "subscribe" doesn't mean "register". Without registering the player name,
clients can receive the broadcast player list.
- [perform action] `unregister`: JavaScript client explicitly removes its player name from the list.
The result is sent back to the client who tries to unregister
- [perform action] `heads_up`: broadcasts the updated player list. The method is called by the JavaScript client
when the client wants to broadcast the updated player list.


#### transmit or broadcast

The PlayerChannel of this application uses `transmit` for subscribe, register and unregister methods, which means
the results are not broadcast.
To broadcast, the client calls `heads_up` action after receiving the payload from `transmit`. It takes double paths.
At a glance, such architecture looks an excess. What if successful register broadcast the updated player list?
Unfortunately, that confuses the client application.
For example, upon a successful registration process, the client app wants to close registration form.
If the successful registration is broadcast, the client needs to figure out
the message is about its own or someone else's successful registration.
So that the client application can act reactively, transmitting the result payload to the only client
who tries it works well.


### RSpec

When it comes to a realistic application, testing is important. Testing Action Cable using RSpec is explained at
[https://github.com/palkan/action-cable-testing](https://github.com/palkan/action-cable-testing).
It is a gem called action-cable-testing. But, as far as using recent versions of Rails and RSpec,
we don't need to install the gem. It is merged in Rails 6 and RSpec 4.


#### Connection specs

The testing framework provides `connect` method, which simulates the connection.
Once the `connect` method is called, we can use `connection` instance to test `identified_by` value.
The `cookies` is available to use in the spec, so we can add a cookie to test the connection.

The connection spec of this application:
- [spec/channels/connection_spec.rb](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/spec/channels/connection_spec.rb?ref_type=heads)

The spec here tests whether `current_player_id` is set correctly.


#### Channel specs

The testing framework provides `stub_connection` and `subsscribe` utility methods.

- `stub_connection`: gives a connection stub. The identifier can be given as a parameter.
- `subscribe`: subscribes to the channel.

The specs for PlayerChannel:
- [spec/channels/player_channel_spec.rb](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/spec/channels/player_channel_spec.rb?ref_type=heads)

The spec calls `stub_connection(current_player_id: uid)` in the before block.
By this, the `current_player_id` value is available to use in the channel methods.
In each spec, `subscribe` is called with a parameter. This simulate the the subscription has done.

To test subscription, we can do:
```ruby
expect(subscription).to be_confirmed
expect(subscription).to have_stream_from('player_channel')
```

To test transmitted payload, `expect(transmissions.last).to eq({...})` does the job.
```ruby
expect(transmissions.last).to eq({key: value})
```

As for testing a broadcast, `have_broadcasted_to` matcher does the job.
```ruby
expect {
  perform :heads_up, {key1: value1}
}.to have_broadcasted_to("player_channel").with({key2: value2})
```

### JavaScript Side

To connect to Rails' WebSocket, [@rails/actioncable](https://www.npmjs.com/package/@rails/actioncable)
JavaScript package would be the best library.
The package provides seamless interaction with WebSocket by Rails Action Cable.

Of course, @rails/actioncable is not the only one choice.
Since WebSocket is a protocol, it's possible to write a connection library from scratch.
In the JavaScript world, well-known WebSocket libraries are out there also.
However, an ease of use, examples to learn about, and more reasons say @rails/actioncable is the best.


#### Basics of Client Side

With @rails/actioncable library, a basic usage is below:
```javascript
const channel = createConsumer()
    .subscriptions
    .create({ channel: 'CHANNEL_CLASS', key: value }, {
        received(data) {
            // do something
        }
    }
```

Above establishes WebSocket connection and calls channel's subscribe method.
The channel to subscribe is a parameter to `create` method.
The callback function, `receieved` receives everything the channel sends back
such as the payload from channel's transmit and broadcast methods.
The client side application should handle all of those.

To call perform action methods, use `channel.perform` function.
```javascript
channel.perform("CHANNEL_METHOD", {key: value})
```

This Tic-Tac-Toe application uses Vue.js and Pinia (something like React + Redux).
The client implementation to use `PlayerChannel` is a Pinia store, `player.ts`.
- [app/frontend/stores/player.ts](https://gitlab.com/yokolet/action-cable-tictactoe/-/blob/main/app/frontend/stores/player.ts?ref_type=heads)

In this application, the payload data is a Hash and has an action key always.
The action is a key to handle received data through WebSocket.
Depending on the action type, received data is processed and set to reactive variables.
The changes of reactive variables are taken care of by a JavaScript framework, in this application, Vue.js.

The client side implementation really varies.
Vue.js, React, Stimulus and many other JavaScript frameworks handles reactive data in their ways.
The basics here is to reflect the updated data to UI by own way.


### Live Application

The multi-player, multi-board Tic-Tac-Toe application is live at:
- [https://action-cable-tictactoe-2fbbd874419e.herokuapp.com/](https://action-cable-tictactoe-2fbbd874419e.herokuapp.com/)


### Consideration

Creating a real-time application by Rails Action Cable is relatively easy.
The framework provides an easy to use API for both back-end and front-end.
The downside would be lack of up-to-date rich information.
Rails Guide gives enough info and examples, but those are fragments.
Google search often hit old Rails 6 examples and blog posts. 
It took a while to figure out how to code and test on Rails 7.
However, once those became clear, the development accelerated.

Try and have fun by creating a real-time application.
