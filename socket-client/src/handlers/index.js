class SocketHandler {
  constructor() {}

  setSocketTopicListener ({
    socket, topic, fn
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        let listeners = socket.listeners(topic);

        if(listeners.includes(fn)) {
          return resolve(true);
        }
        else {
          socket.on(topic, fn);
          return resolve(true);
        }
      }
      catch(e) {
        return reject(e);
      }
    }) 
  }
}
export const socketHandler = new SocketHandler();

// update the chat room components
function updateChatRoom({
  roomId, newMsg
}) {
  // ---- Change this (begin) --- //
  // ---------------------- example -------------- //
  console.log(`
  [room ${roomId}]
  [sender ${JSON.stringify(newMsg.sender)}]
  [chatConet ${JSON.stringify(newMsg.chatContent)}]
  `);
  // ---- Change this (end) --- //
}

// get list of user joined roomIds
export function getUserRoomIds({
  userToken
}) {
  // ---- Change this (begin) --- //
  // call api for getting joined roomIds list
  //  --------------------- example --------------------- //
  let roomIds = [];
  let exampleUser = {
    userToken: `sylToken`,
    userRoomIds: [
      `6075d914390dfe6e8c0495e7`,
      `6075d91e7d7a0e01884a24de`
    ]
  };

  if(userToken === exampleUser.userToken) {
    roomIds = exampleUser.userRoomIds;
  }

  return roomIds;
  // ---- Change this (end) --- //
}

// init the message/chat handler for updating chat in real-time
export function initChatRoom({
  socket,
  roomId
}) {
  socket.on(roomId, (msg, cb) => {
    // notify the emitter that the message is successfully received
    cb(true);

    updateChatRoom({
      roomId, newMsg: msg
    });
  })
}