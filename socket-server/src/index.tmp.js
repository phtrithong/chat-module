// socket.io@3
import { Server } from "socket.io";
import moment from 'moment';

import config from './config/index.js';

import { 
  socketHandler, 
  socketMiddleware, 
  getUserProfile 
} from './handlers/index.js';

import redisHandler from './services/redis_handler.js';
import rabbitHandler from './services/rabbit_handler.js';

const options = {
  path: `/ws` // default is "/socket.io"
}

// init the socket server
const io = new Server(config.port, options);
console.log(`started socket server at port ${config.port}`);

// get the instance of "root" namespace
const rootNsp = io.of("/");

// middleware for validation
io.use(socketMiddleware.validate);

rootNsp.on("connection", (socket) => {
  let userId = socket.userId;
  console.log(`user ${userId} connected using socker ${socket.id}`);

  // set user status to online
  let userOnlineStatusKey = `user:${userId}:online`;

  redisHandler.set(userOnlineStatusKey, true);

  socketHandler.initUserJoinedRoom({
    socket,
    userId
  });

  // handler invoked when the connection is stopped
  socket.on('disconnect', (reason) => {
    // update user status to offline
    let userOnlineStatusKey = `user:${userId}:online`;
    redisHandler.del(userOnlineStatusKey);

    // change this
    // update user's lastSeen timestamp in db
    let userLastSeen = moment().valueOf();

  });

  // handler invoked when data is published to topic "chat"
  socket.on('chat', ({
    roomId,
    chatContent
  }, cb) => {
    // notify the emitter that the message is successfully received
    cb(true);

    let createdAtEpochValue = moment().valueOf();

    let userProfile = getUserProfile({
      userId: socket.userId
    });

    let toSendMessage = {
      sender: userProfile,
      chatContent: chatContent,
      createdAt: createdAtEpochValue
    };

    // broadcast the received message to all clients that joined the room
    rootNsp.to(roomId) // emit to a specific socket room
    .emit(roomId, toSendMessage);

    // change this 
    // store the message to db

    // -------------------------- //
  })
});