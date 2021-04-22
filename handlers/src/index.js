import rabbitHandler from './services/rabbit_handler.js';

/**
 * Used to create a new chat room
 * @param  {string[]} memberIds Ids of the members that will be in the new room
 * @return {Promise}      
 */
export function createChatRoom({
  memberIds,
  // ... Add other information due to the projetct bussiness
}) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('___ createChatRoom');
      // ---- Change this (begin) --- //
      // Depend on db design, create an entity for the new chat room and store in the db
      // ---- Example ---- 
      let uniqueRoomId = Math.random().toString().substr(2, 16); // an unique id for the room

      for(let i=0; i<memberIds.length; i++) {
        let memberId = memberIds[i];
        // Send a request to message queue (which will be handled by the socker-server),
        //  to join the socker instance of this user to a specific socket-room  
        await rabbitHandler.produce({
          queueName: `user_join_room`,
          // ---- Change this (begin) --- //
          // Modify the data due to the project bussiness 
          data: {
            userId: memberId,
            roomId: uniqueRoomId
          }

          // ---- Change this (end) --- //
        });

        console.log(`user_join_room to user memberId ${memberId}`);
      }

      // ---- Change this (end) --- //

      return resolve(uniqueRoomId);
    }
    catch(err) {
      return reject(err);
    }
  })
}

/**
 * Used to leave the user from a room
 * @param  {string} userId Id of the user to leave the room
 * @param  {string} roomId Id of the room to leave
 * @return {Promise}      
 */
export function leaveUserFromChatRoom({
  userId, 
  roomId
}) {
  return new Promise(async (resolve, reject) => {
    try {
      // ---- Change this (begin) --- //
      // Depend on db design, clean the "relationship" of {userId} and {roomId} and relevant entities



      // ---- Change this (end) --- //

      // Send a request to message queue (which will be handled by the socker-server),
      //  to "leave" the socket instance of this user from the corresponding socket-room
      await rabbitHandler.produce({
        queueName: `user_leave_room`, 
        // ---- Change this (begin) --- //
        // Modify the data due to the project bussiness 
        data: {
          userId,
          roomId
        }
        // ---- Change this (end) --- //
      });
      return resolve(true);
    }
    catch(err) {
      return reject(err);
    }
  })
}