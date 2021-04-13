// socket.io@3
import { Server } from "socket.io";

import config from './config';

const options = {
  // path is the endpoint used for init (handshake) the connection
  // path must be matched on the client-side
  path: `/ws` // default is "/socket.io"
}

const io = new Server(config.port, options);
const rootNsp = io.of("/");

// middleware for validation
io.use((socket, next) => {
  try {
    // auth is an obj passed by the client when init (handshake) the connection
    // auth obj can be modified
    let auth = socket.handshake.auth;

    console.log('auth :>> ', auth);

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
      return next(new Error(`invalid token`));
    }
    // ------------------------------------- //
  }
  catch(err) {
    logger.error(err);
    // disconnect the socket client
    socket.disconnect(true);
    return;
  }
});

rootNsp.on("connection", (socket) => {
  // socket is the initialized socket instance for the client

  console.log('socket :>> ', socket);
});