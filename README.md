# POC Server Owned Timer

This monorepo was created to help me experiment with web sockets and the observer pattern.

The client package was scaffolded using [vite](https://vitejs.dev/). Its functionality entails rendering a timer display that is updated when timer's state is updated and sending start/stop commands to the server.

The server package spins up a web server using Node's built-in `http` module. The server is responsible for creating an instance of a timer service, extending [socket.io](https://socket.io/docs/v4/)'s `Socket` class to support the observer pattern, listening for start/stop commands and sending state updates to the client.
