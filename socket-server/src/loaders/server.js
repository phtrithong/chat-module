import moment from 'moment';

import config from '../config/index.js';

import { SocketServer } from '../services/socket_server.js';
import redisHandler from '../services/redis_handler.js';

import { 
  socketMiddleware, 
  socketHandler,
  getUserProfile
} from '../handlers/index.js';

const server = new SocketServer({
  port: config.port
});

server.addMiddleware(socketMiddleware.validate);

server.setNspTopicListener({
  nsp: '/',
  topic: 'connection',
  fn: (socket) => {
    let userId = socket.userId;
    console.log(`user ${userId} connected using socker ${socket.id}`);

    // set user status to online
    let userOnlineStatusKey = `user:${userId}:online`;

    redisHandler.set(userOnlineStatusKey, true);

    socketHandler.initUserJoinedRoom({
      socket,
      userId
    });

    socketHandler.setSocketTopicListener({
      socket,
      topic: "disconnect",
      fn: (reason) => {
        // update user status to offline
        let userOnlineStatusKey = `user:${userId}:online`;
        redisHandler.del(userOnlineStatusKey);

        // ---- Change this (begin) --- //
        // update user's lastSeen timestamp in db
        let userLastSeen = moment().valueOf();


        // ---- Change this (end) --- //
      }
    });

    socketHandler.setSocketTopicListener({
      socket,
      topic: "chat",
      fn: ({roomId, chatContent}, cb) => {
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

        server.getRootNsp()
        .then(rootNsp => {
          // broadcast the received message to all clients that joined the room
          rootNsp.to(roomId) // emit to a specific socket room
          .emit(roomId, toSendMessage);
        })
        .catch(err => {
          console.log('err :>> ', err);
        });

        // ---- Change this (begin) --- //
        // store the message to db

        // ---- Change this (end) --- //
      }
    });
  }
})

export default server;
