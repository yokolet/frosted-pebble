A proof of concept application to create a transcript from English to Japanese Katakana.
The idea might help text to speech or English word to Japanese sound notation.

The application consists of two parts:
[Web application](https://github.com/yokolet/transcript-web) and
[Transcript engine](https://github.com/yokolet/transcript).
The web application provides a GraphQL endpoint.
The transcript engine has a main feature of creating transcripts.
Flask is a web framework for this app, while the engine is written by a simple Python.
