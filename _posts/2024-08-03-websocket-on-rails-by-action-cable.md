---
layout: post
title: WebSocket on Rails by Action Cable
featured_image: pink-camellia.jpg
date: 2024-08-03 00:10 +0900
---
In the web application domain, we hear some protocol names.
Absolutely, HTTP or HTTPS is the most famous protocol that all web developers know.
Although there's a mechanism of [Keep-Alive](/2024/07/17/conserving-network-resources-keep-alive.html),
a single request/response sequence with a single client/server is all done by HTTP.
The client initiates the HTTP request to the server. Once the client receives the HTTP response from the server,
communication finishes. As far as HTTP is used, the server just waits and waits. Only when the request comes in, the
server can send back some data to the client. This communication style is surprisingly capable of doing many things,
so most web applications are satisfied with HTTP.

But! Let's think of a chat application. Two or more people write messages to each other.
How do we see newer messages from other folks? Reload every time?
Definitely, no. We don't want to click a reload button every time to see newer ones.
For this type of communication, a protocol called WebSocket has been created.
Since then, WebSocket is used for a chat, multi-player game, online presence status, and more.
This blog post is about WebSocket protocol and how Ruby on Rails handles it.


### What is WebSocket protocol

WebSocket is a protocol defined by [RFC6455](https://datatracker.ietf.org/doc/html/rfc6455).
As many documents or blog posts explain, WebSocket provides a two-way interactive communication session
over a single TCP connection. The two-way interactive communication is often called a full-duplex bidirectional
communication. Not like HTTP, both client and server can send data each other.

#### WebSocket Handshake

The communication by WebSocket initially starts from normal HTTP request/response. Then the communication is upgraded to
WebSocket. Once the bidirectional communication establishes, a single TCP connection is used to send/receive data
until a client or server closes the connection.

The initial HTTP request/response sequence is called a WebSocket handshake.
[MDN (Mozilla Developer Network) document](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
explains how the handshake goes.
Suppose the server listens to the WebSocket request at http://example.com/chat, the client sends the HTTP request
something like below:

```
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

The HTTP request header above has Connection: Upgrade and Upgrade: websocket. These are keys to get started.
Also, Sec-WebSocket-Key header field is there. The value is basically 16 bytes base 64 encoded string.
Precisely, the forgiving-base64-encoded or isomorphic encoded is used to create a string.
The key is used to avoid [Cross-site WebSocket hijacking](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking).

When the server receives the upgrade request, it returns something like below as a response.

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

The status code is 101.
Upon receiving the response above, the protocol is upgraded to WebSocket.
Among the response header field, we see a Sec-WebSocket-Accept field.
It is the answer to Sec-WebSocket-Key from the client.
The client can verify the server when it receives the Sec-WebSocket-Accept.

The Sec-WebSocket-Accept value is created by the steps below:
1. Concatenate Sec-WebSocket-Key field value in the request and GUID value, `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`.\
    The GUID value is always the same, a magic number.
2. Take SHA1 hash and base64 encode.

In Ruby, the encoding can be done by Digest::SHA1.base64digest.
Let's try above Sec-WebSocket-Key and see if the same value of Sec-WebSocket-Accept will be created.

```bash
$ irb
irb(main):001> require 'digest'
=> false
irb(main):002> key = 'dGhlIHNhbXBsZSBub25jZQ=='
=> "dGhlIHNhbXBsZSBub25jZQ=="
irb(main):003> magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
=> "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
irb(main):004> accpt = Digest::SHA1.base64digest(key + magic)
=> "s3pPLMBiTxaQ9kYGzzhZRbK+xOo="
```

<img width="1000px" src="/assets/img/WebSocket.jpg" alt="img: WebSocket">


#### WebSocket Heartbeat

After the WebSocket connection is established, a client or server can send a ping to a counterpart.
The client or server who receives the ping must return a pong to the other side immediately or within a certain time frame.
This is the heartbeat of the WebSocket.

The heartbeat by pinging is useful for handling the connection for the reasons below:
- verify the client and server are connected
- prevent firewalls and proxies from terminating inactive connections

That is all about WebSocket as a protocol.


### Action Cable

Ruby on Rails supports WebSocket by Action Cable. The Action Cable was introduced on Rails 5.
Just including (or not skipping) Action Cable makes WebSocket available to use.
Let's try Action Cable.


#### Create a Rails app

Rails is an all-inclusive type web framework. All features are supported by default.
We don't need to do anything special to enable Action Cable while creating a Rails app.
Only when `--minimal` or `--skip-action-cable` option is specified, Action Cable is not included.
Even when `--api` option is specified, Action Cable a.k.a WebSocket is supported.

For a simplicity, create a Rails app with default options.

```bash
$ rails new just-a-sample
```

#### Test WebSocket

Nothing special. Go to just-a-sample directory and start the Rails server.

```bash
$ cd just-a-sample
$ bin/rails s
```

That's it. WebSocket is ready to accept the request.
ActionCable.server is mounted on /cable by default, so using a curl command, try below HTTP request.

```bash
$ curl --http1.1 -i -N \
> -H 'Sec-Websocket-Version: 13' \
> -H 'Sec-Websocket-Key: QUo86XL2bHszCCpigvKqHg==' \
> -H "Connection: Upgrade" \
> -H "Upgrade: websocket" \
> -H "Origin: http://localhost:3000/cable" \
> http://localhost:3000/cable
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: 8dlVwoWynsF/RauFo6HjkWl7dLk=

�{"type":"welcome"}�${"type":"ping","message":1722608438}�${"type":"ping","message":1722608441}�${"type":"ping",
"message":1722608444}�${"type":"ping","message":1722608447}
```

As we see, the status code 101 is returned. The connection is upgraded to WebSocket, and Sec-WebSocket-Accept is returned.
Right after the connection is established, a welcome message is sent back. Then, ping messages come in a fixed interval.

On the console that the Rails server is running, we see the message below:

```bash
Started GET "/cable" for ::1 at 2024-08-02 23:20:35 +0900
Started GET "/cable" [WebSocket] for ::1 at 2024-08-02 23:20:35 +0900
Successfully upgraded to WebSocket (REQUEST_METHOD: GET, HTTP_CONNECTION: Upgrade, HTTP_UPGRADE: websocket)
```

When, the curl command quits by hitting control-c, the message below shows up:
```bash
Finished "/cable" [WebSocket] for ::1 at 2024-08-02 23:20:48 +0900
```

### Note

As we see, starting WebSocket on Rails is very easy, zero configuration.
That's a good news, but also a bad news.
If the Rails app is created without --skip-action-cable option, the app accepts WebSocket requests.
The app keeps sending ping frames to the clients who requested a WebSocket connection.
What if many curl requests try to establish WebSocket connections?
The ping frame is light weight, and the WebSocket connection can't do anything except sending pings.
The risk of data breach or session hijacking would be almost zero, however, DoS (DDoS) type attack might be possible.

It's a good practice to specify --skip-action-cable option if the app doesn't need WebSocket.

### Comments and Discussions

GitHub Discussions: [WebSocket on Rails by Action Cable #10](https://github.com/yokolet/new-note/discussions/10)

### References

- RFC6455 The Websocket Protocol: [https://datatracker.ietf.org/doc/html/rfc6455](https://datatracker.ietf.org/doc/html/rfc6455)
- Rails Guides: Action Cable Overview: [https://guides.rubyonrails.org/action_cable_overview.html](https://guides.rubyonrails.org/action_cable_overview.html)
- MDN: Writing WebSocket servers: [https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
- A simple guide to Action Cable: [https://dev.to/lucaskuhn/a-simple-guide-to-action-cable-2dk2](https://dev.to/lucaskuhn/a-simple-guide-to-action-cable-2dk2)
- Understanding Action Cable in Rails 7: [https://patrickkarsh.medium.com/understanding-action-cable-in-rails-7-24e942f6a8d7](https://patrickkarsh.medium.com/understanding-action-cable-in-rails-7-24e942f6a8d7)
