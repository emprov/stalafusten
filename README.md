# stalafusten
A simple real time multiplayer game about cities, countries, rivers and reasons for a divorce.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need node.js and npm installed for the following instructions to work getting you started. This game currently only runs on firefox web browser clients.


### Installing

Get the dependencies installed.

```
npm install
```

### Run the application
Start the server code.

```
node server.js
```

This starts two servers:
* http server listening on port 5500, using node.js
* websocket server listening on port 3000, using socket.io

To start playing, go to http://<host>:5500 . And in local setup this is

```
http://localhost:5500
```

## Running the tests

Currently, this is a protoype without tests.


## Deployment

I think you can run this on any machine accessible via TCP, with open ports 5500 and 3000. Remember: This is a prototype, not a production ready project. Just have fun with it.

## Built With

* [Socket.io](https://socket.io/) - The javascript web for real time communication amongst server and clients 
* [express](https://expressjs.com/) - Minimalist web framework for Node.js, especially for routing
* [node.js](https://nodejs.org/) - The server side javascript runtime
* [bootstrap](https://getbootstrap.com/) - Css framework for pretty styling out of the box

## Contributing

There's no process in place.

## Versioning

Currently there's no versionig. If it comes, it will be  [SemVer](http://semver.org/) for versioning.

## Authors

* emprove


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Socket.io examples didn't work well for me. But this guy gave me the base line https://www.youtube.com/watch?v=rxzOqP9YwmM


