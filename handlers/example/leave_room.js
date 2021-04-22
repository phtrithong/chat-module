import { leaveUserFromChatRoom } from '../src/index.js';
import rabbitHandler from '../src/services/rabbit_handler.js';

async function init() {
  // init the message queue
  await rabbitHandler.initConnection();

  await rabbitHandler.initChannel();

  rabbitHandler.initQueue({
    queueName: `user_leave_room`
  });


  // Example roomIds for user with id sylId
  // roomIds: [
  //   `6075d914390dfe6e8c0495e7`,
  //   `6075d91e7d7a0e01884a24de`
  // ]

  await leaveUserFromChatRoom({
    userId: 'sylId',
    roomId: '6075d914390dfe6e8c0495e7'
  });

}

init();