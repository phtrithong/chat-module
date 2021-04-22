import rabbitHandler from '../services/rabbit_handler.js';
import socketServer from './server.js';

import { socketHandler } from '../handlers/index.js';

async function init() {
  // message queue init
  await rabbitHandler.initConnection();
  await rabbitHandler.initChannel();

  rabbitHandler.initQueue({
    queueName: `user_join_room`
  });
  rabbitHandler.consume({
    queueName: `user_join_room`,
    callback: ({msg, channel}) => {
      let data = JSON.parse(msg.content.toString());

      let {
        userId, roomId
      } = data;
  
      socketServer.getRootNsp()
      .then((rootNsp) => {
        return socketHandler.joinUserToRoom({
          nsp: rootNsp,
          userId,
          roomId
        });
      })
      .then(() => {
        channel.ack(msg);
      })
      .catch(err => {
        throw err;
      })
    }
  })

  rabbitHandler.initQueue({
    queueName: `user_leave_room`
  });
  rabbitHandler.consume({
    queueName: `user_leave_room`,
    callback: ({msg, channel}) => {
      let data = JSON.parse(msg.content.toString());

      let {
        userId, roomId
      } = data;
  
      socketServer.getRootNsp()
      .then(async (rootNsp) => {
        // To leave the user's socket instance from the socket-room
        await socketHandler.kickUserFromRoom({
          nsp: rootNsp,
          userId,
          roomId
        });

        console.log(`Leave user with id: ${userId} from room with id: ${roomId}`);
        return;
      })
      .then(() => {
        channel.ack(msg);
      })
      .catch(err => {
        throw err;
      })
    }
  })
}

init();