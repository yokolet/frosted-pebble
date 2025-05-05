---
layout: post
title: Datomic Quick Start in 2023
hero_height: is-small
date: 2023-02-07 18:03 +0900
---
I used to use Datomic, [https://www.datomic.com](https://www.datomic.com), a lot.
Datomic is a unique database. The most attractive feature would be the idea of preserving transactions.
Based on the transaction id, Datomic is able to pull out the past data which has been already updated later.

Other than that Datomic has more unique and remarkable features.
However, the downside is, it is not so easy to get started.
Datomic has an excellent documentation on its web site.
Even though, just getting started requires a bit of hustle since it is for high-end skill-full people.
Besides, changes were made since I used it last time which is roughly a few years back.

Recently, I had a chance to use Datomic.
As I mentioned, I experienced some kind of hustle.
Not to do the same hustle again, I'll write a memo here about the attempt in early 2023.


### Get Datomic

The first thing to do is absolutely to get Datomic.
If you haven't, sign up yourself at [https://my.datomic.com/](https://my.datomic.com/).
The choice here is the no cost, starter edition here, still, you need to sing up.
(My memory is not clear, but I might have selected Starter version during the sign up.)
Once you are successfully registered, the license key will be emailed.
The license key needs to run Datomic with a transactor. I'll explain later.

You are now able to download Datomic from the Downloads link at my datomic web site.
I downloaded the latest version, datomic-pro-1.0.6610.zip, as of early February, 2023.
The archive name is datomic-pro, however, my license is of "Datomic Pro Starter Edition, " as I see it at my Account page.
It looks the archive name doesn't matter in terms of the type of license.

### Types of Datomic

As of now, Datomic has types below:

- Cloud
- On-Prem
  - on memory
  - on local storage (disk)
  - on storage service such as PostgreSQL, DynamoDB, Cassandra

This memo is for a quick start, so on-prem's memory or local storage is an option.
The on memory type is easy and runs without a specific setup.
However, it's just for a handy test. When a process is terminated, all will be gone.
Given that, this memo is about on-prem's local storage type.


#### Set License Key

Assuming downloaded Datomic archive has been extracted in somewhere,
this section explains how to set the license key.

You should have the Datomic license key emailed when you registered yourself at my.datomic.com.
The email has `license-key=[long-long-six-line-or-so-text key]` in its body part.
You may copy paste the email text to the config file.
You might want to open the attachment to copy/paste.
Both are the same.

The document you should look at is: [Run a Transactor](https://docs.datomic.com/on-prem/getting-started/transactor.htm).
As the document says, copy the template config file, config/samples/dev-transactor-template.properties, to
config/dev-transactor-template.properties.
Then, open the properties file and paste the license key to the line, `license-key=`.

This is all for the quick start set up.


#### Run Datomic

It's time to start Datomic.
If it is an RDBMS like PostgreSQL, people say "start the server."
However, as for Datomic, it is "run the transactor."
This is because Datomic works as a transactor when storage services are used.
So, the document you should look at is:
[Run a Transactor](https://docs.datomic.com/on-prem/getting-started/transactor.htm).

Assuming you are on the top directory of the unzipped Datomic archive,
hit the command:
```bash
bin/transactor -Ddatomic.printConnectionInfo=true config/dev-transactor-template.properties
```

Now, Datomic started running.
The local storage, db/datomic.h2.db, should be created.

#### Connect to Datomic and do things

Datomic comes with the repl.
Its usability is not so nice like lein repl, but enough to test things.
Now what you can do are:
- create and connect to the database: [Connect to a Database](https://docs.datomic.com/on-prem/getting-started/connect-to-a-database.html)
- transact a schema (create a table definition in RDBMS): [Transact Schema](https://docs.datomic.com/on-prem/getting-started/transact-schema.html)
- transact data (insert a data in RDBMS): [Transact Data](https://docs.datomic.com/on-prem/getting-started/transact-data.html)
- make a query: [Query the Data](https://docs.datomic.com/on-prem/getting-started/query-the-data.html)

Start the Datomic repl by `bin/repl`.
Copy texts from the document above and paste it on Datomic repl.
All should work.


#### Use Datomic from Leiningen project

Datomic's repl is handy. Everything is set up.
But, Clojure dev won't do all on Datomic's repl.
In general, Clojure people create and configure a project.

One thing not straightforward is a repository for Datomic client API.
In many cases, Clojure libraries are hosted on [https://clojars.org](https://clojars.org).
No authentication is required.
On the other hand, Datomic client API is hosted on the private repository which needs authentication to download.

If you visit your datomic account page, [https://my.datomic.com/account](https://my.datomic.com/account),
you will find brief explanation how to use from Leiningen.
To me, that was not so clear. I had to do some googling to figure out how.

Eventually, I could use Datomic client API in the leiningen project.
Here's how I made it.

##### Install gpg and configure a key pair

Leiningen uses a GPG encrypted credential to connect private repositories.
It is explained in the document,
[https://github.com/technomancy/leiningen/blob/master/doc/DEPLOY.md#authentication](https://github.com/technomancy/leiningen/blob/master/doc/DEPLOY.md#authentication).
As the document says, gpg should be installed, and a key pair should be configured.
About installation, another document,
[https://github.com/technomancy/leiningen/blob/stable/doc/GPG.md](https://github.com/technomancy/leiningen/blob/stable/doc/GPG.md)
is helpful.

Following the document, install the gpg first if not yet installed.
I'm on OSX, so I hit the command, `brew install gnupg`.

After a successful installation, create the gpg key pair by `gpg --gen-key`.
While creating the key pair, user name, email and passphrase were asked.
There might be a variation depends on the OS, gnupg version or other.

The document above explains more about how to use gpg command.
However, once the key pair is created, that's all.

##### Create a credential file and encrypt it

Create `~/.lein/credentials.clj` file with the content displayed in the my.datomic.com account page.
It is like:

```clojure
{#"my\.datomic\.com" {:username "YOUR EMAIL HERE"
                      :password "YOUR PASSWORD HERE"}}
```

Copy and paste it in `~/.lein/credentials.clj` file.

The next step is to encrypt the credential file.
As the leiningen authentication document describes, hit the command,

```bash
gpg --default-recipient-self -e \
    ~/.lein/credentials.clj > ~/.lein/credentials.clj.gpg
```

Now, the gpg encrypted credential is ready.


##### Edit project.clj

The last piece is to configure the Datomic private repository in the project.clj file.
How to setup is written in the my Datomic account page.
I wrote earlier "I downloaded the latest version, datomic-pro-1.0.6610.zip, as of early February, 2023."
So the datomic-pro version is 1.0.6610.

```clojure
:repositories {"my.datomic.com" {:url "https://my.datomic.com/repo"
                                 :creds :gpg}}
:dependencies [[com.datomic/datomic-pro 1.0.6610]]
```

##### Test Repl

As you know the command is:

```bash
lein repl
```

For the first time, a bunch of libraries in dependency will be downloaded.
When the leiningen repl is started, try "Connect Datomic and do things" following the Datomic document.
All should work.

