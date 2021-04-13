export class SocketHandler {
  constructor() {
    this.socketUsers = {};
  }

  getUserSocketInstance ({
    nsp,
    userId
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSocketInstance;
        let userSocketId = this.socketUsers[userId];
        if(userSocketId) {
          userSocketInstance = nsp.sockets.get(userSocketId);
          if(userSocketInstance) {
            return resolve(userSocketInstance);
          }
        }
        else {
          let onlineUserSocketId;
          nsp.sockets.forEach((socketInstance, socketId) => {
            if(socketInstance.userId === userId) {
              onlineUserSocketId = socketId;
            }
          });

          if(onlineUserSocketId) {
            userSocketId = onlineUserSocketId;
            userSocketInstance = nsp.sockets.get(userSocketId);
            return resolve(userSocketInstance);
          }
          else {
            return reject(new Error(`not_found_user_socket_instance`));
          }
        }        
      }
      catch(err) {
        return reject(err);
      }
    })
  }

  joinUserToRoom ({
    nsp,
    userId,
    roomId
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSocketInstance;
        
        try {
          userSocketInstance = await this.getUserSocketInstance({
            nsp, userId
          });
        }
        catch(e) {
          throw e;
        }

        userSocketInstance.join(roomId);
        return resolve(true);
      }
      catch(err) {
        return reject(err);
      }
    })
  }

  kickUserFromRoom({
    nsp,
    userId,
    roomId
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSocketInstance;
        
        try {
          userSocketInstance = await this.getUserSocketInstance({
            nsp, userId
          });
        }
        catch(e) {
          throw e;
        }

        userSocketInstance.leave(roomId);
        return resolve(true);
      }
      catch(err) {
        return reject(err);
      }
    })
  }

  initUserJoinedRoom ({
    socket, 
    userId
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        let userSocketInstance = socket;

        // query user joined roomIds from the db
        // change this
        // ----------------- example -------------- //
        let user = {
          userId: `sylId`,
          roomIds: [
            `6075d914390dfe6e8c0495e7`,
            `6075d91e7d7a0e01884a24de`
          ]
        }

        let roomIds = [];
        if(user.userId === userId) {
          roomIds = user.roomIds
        }
        // ---------------------------------------- //

        if(roomIds.length) {
          roomIds.forEach(roomId => {
            userSocketInstance.join(roomId);
          });
        }

        return resolve(true);
      }
      catch(err) {
        return reject(err);
      }
    })
  }
}

export const SocketMiddleware = {
  validate (socket, next) {
    try {
      // auth is an obj passed by the client when init (handshake) the connection
      // auth obj can be modified
      let auth = socket.handshake.auth;
  
      let {
        token
      } = auth;
  
      // change this to the current authn mechanism 
      // (as if with jwt) verify the token, parse the token which contains the userId
      // -------------- example -------------- //
      if(token === `sylToken`) { 
        let parsedToken = {
          userId: `sylId`,
          userName: `syl`
        };
  
        // bind the userId to the initializing socket for later authz
        socket.userId = parsedToken.userId;
        return next();
      }
      else {
        // throw the error to the socket client instance
        return next(new Error(`server:invalid_token`));
      }
      // ------------------------------------- //
    }
    catch(err) {
      logger.error(err);
      return next(new Error(`server:internal_error`));
    }
  }
}