// socket.io-client@3
import { io } from 'socket.io-client';
import config from './config.js';

const rootNsp = '/';

const options = {
  path: "/ws", // default is "/socket.io"
  auth: {},
  transports: ["websocket"]
};

// obj argument
// -- token: the authn token of the user using this socket client instance
const initRootNspSocket = ({
  token = "123"
}) => {
  // add "token" to the auth obj
  options.auth.token = token;

  // declare the connection for the socket instance
  const rootNspSocket = io(`ws://${config.server_host}:${config.server_port}${rootNsp}`, options);

  // handler invoked when socket client is connected
  rootNspSocket.on("connect", () => {
    console.log(`socket client ${rootNspSocket.id} connected`);
  });

  // handler invoked when the connection is stopped
  rootNspSocket.on("disconnect", (reason) => {
    console.log(`socket client ${rootNspSocket.id} disconnected with reason`, reason);
  });

  // handler invoked when the connection can't establish
  rootNspSocket.on("connect_error", (err) => {
    // handle the error message (the message is customized)
    // if invalid token
    if(err.message === `server:invalid_token`) {
      console.log(`getting new token and re-initing`);
      // verify the current token, refresh it or re-login if needed
      // then, re-init the socket client instance
      
      // get the new token
      let newToken = "sylToken";

      // stop the current socket instance from trying  to reconnect
      rootNspSocket.disconnect();

      // init a new socket instance with the new token
      return initRootNspSocket({
        token: newToken
      });
    }
  });
}

initRootNspSocket({});