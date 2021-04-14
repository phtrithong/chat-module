import rabbitHandler from './services/rabbit_handler.js';

/**
 * Used to create a new chat room
 * @param  {string[]} memberIds Ids of the members that will be in the new room
 * @return {Promise}      
 */
export function createChatRoom({
  memberIds,
  // ... other information based on the bussiness
}) {
  return new Promise(async (resolve, reject) => {
    try {
      // change this
      // depend on db design
      // create an entity for the new chat room and store in the db
      // ------------ example ----------- //
      let uniqueRoomId = Math.random().toString().substr(2, 16);

      for(let i=0; i<memberIds.length; i++) {
        let memberId = memberIds[i];
        await rabbitHandler.produce({
          queueName: `user_join_room`,
          data: {
            userId: memberId,
            roomId: uniqueRoomId
          }
        });
      }

      // -------------------------------- //

      return resolve(uniqueRoomId);
    }
    catch(err) {
      return reject(err);
    }
  })
}

/**
 * Used to leave the user from a room
 * @param  {string} userId Id of the user that wants to leave the room
 * @param  {string} roomId Id of the chat room to leave
 * @return {Promise}      
 */
export function leaveChatRoom({
  userId,
  roomId
}) {
  return new Promise(async (resolve, reject) => {
    try {
      // change this
      // depend on db design
      // clean the "relationship" of {userId} and {roomId} and relevant entities


      // ----------------------------- //

      // notify the socket server
      // to leave the user's socket instance from the corresponding socket room
      await rabbitHandler.produce({
        queueName: `user_leave_room`, 
        data: {
          userId,
          roomId
        }
      });
      return resolve(true);
    }
    catch(err) {
      return reject(err);
    }
  })
}