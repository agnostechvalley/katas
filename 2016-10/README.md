# ZeroMQ Rock/Paper/Scissors

In honor of http://hintjens.com let's use [ZeroMQ](http://zeromq.org) to pit our machines against each other in simple socket-based rock/paper/scissors aka (RPS) games.

## Rules

Provide a SERVER and CLIENT implementation using any language you choose, but it must implement the [ZeroMQ PAIR socket](http://api.zeromq.org/2-1:zmq-socket#toc14) to limit only 1 connection at a time (this will help understand both ends).

Both server and client need to keep tabs on the moves and scores for each game and output them as the games progress. Once the games are over we can compare screens to make sure the results are correct.

### Server

1. Decides how many games and what port it runs one. Just like in real life you are asking a friend if they want to play some games of RPS.
2. Needs to be started with environment variables `GAMES` and `PORT`.
3. Once started the server will output how many games it wants to play and the TCP address (IP and port) so a client can connect and sent the server its first move.
4. Needs to respond to a client move with a server move thus ending that game and output the results.
5. Once the `GAMES` count has been reached the server will output the final results and tell the client the to disconnect safely.
6. It will stay running for the next client to make a connection.

### Client

1. Needs to be started with environment variable `ADDRESS` which is the TCP address of the server above.
2. Once connected it will generate a random RPS move and send it to the server to kickstart the games.
3. Needs to respond to a server move by outputting the results and then sending a new move back.
4. When the client gets a message to disconnect it will output the final results and close the connect and exit.

### Sample Interaction

Somesome starts their server in Go...

```shell
$ GAMES=3 PORT=131313 run rps_server.go
Games to play: 3
Socket: tcp://192.198.0.13:131313

Game: 1
Me: Rock
You: Paper
Winner: You
Score: 0\1

Game: 2
Me: Rock
You: Scissors
Winner: Me
Score: 1\1

Game: 3
Me: Paper
You: Scissors
Winner: You
Score: 1\2

Overall Winner: You
```

Then someone starts their client in Node.js...

```shell
$ ADDRESS=192.168.0.13:131313 node rps_client.js
Games to play: 3

Game: 1
Me: Paper
You: Rock
Winner: Me
Score: 1\0

Game: 2
Me: Scissors
You: Rock
Winner: You
Score: 1\1

Game: 3
Me: Scissors
You: Paper
Winner: Me
Score: 2\1

Overall Winner: Me
```
## Messages

Lets keep this as simple as possible and avoid complex JSON objects and stick with strings or byte arrays to pass through the socket.

`rock`, `paper`, `scissors` - Used by both server and client when generating moves or accepting moves.

`end` - Sent by the server to the client signaling the games are over and the client should disconnect.
