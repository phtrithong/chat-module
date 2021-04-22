import { createChatRoom, leaveUserFromChatRoom } from '../src/index.js';
import rabbitHandler from '../src/services/rabbit_handler.js';

async function init() {
  // init the message queue
  await rabbitHandler.initConnection();

  await rabbitHandler.initChannel();

  rabbitHandler.initQueue({
    queueName: `user_join_room`
  });

  rabbitHandler.initQueue({
    queueName: `user_leave_room`
  });

  console.log('here');

  createChatRoom({
    memberIds: [
      `sylId`,
      `jaxId`,
      `joeId`
    ]
  });
}

init();