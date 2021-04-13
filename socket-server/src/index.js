// socket.io@3
import { Server, Socket } from "socket.io";

import config from './config/index.js';

import { SocketHandler, SocketMiddleware } from './handlers/index.js';

const socketHandler = new SocketHandler;

const options = {
  // path is the endpoint used for init (handshake) the connection
  // path must be matched on the client-side
  path: `/ws` // default is "/socket.io"
}

// init the socket server
const io = new Server(config.port, options);
console.log(`started socket server at port ${config.port}`);

// get the instance of "root" namespace
const rootNsp = io.of("/");

// middleware for validation
io.use(SocketMiddleware.validate);

rootNsp.on("connection", (socket) => {
  let userId = socket.userId;

  socketHandler.initUserJoinedRoom({
    socket,
    userId
  });



  console.log('userId :>> ', userId);
  // socket is the initialized socket instance for the client
});