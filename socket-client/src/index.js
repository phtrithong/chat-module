// socket.io-client@3
import { io } from 'socket.io-client';
import config from './config';

const rootNsp = '/';

const options = {
  path: "/ws", // default is "/socket.io"
  auth: {
    token: "123"
  },
  transports: ["websocket"]
};

console.log('config :>> ', config);

const initRootNspSocket = () => {
  const rootNspSocket = io(`ws://${config.server_host}:${config.server_port}${rootNsp}`, options);

  // handler invoked when socket client is connected
  rootNspSocket.on("connect", () => {
    
  });

  rootNspSocket.on("disconnect", (reason) => {
    console.log('disconnect reason :>> ', reason);
  });

  rootNspSocket.on("connect_error", (err) => {
    console.log('connect_error err :>> ', err.message);

    // handle the error message (the message is customized)
    // if invalid token
    if(err.message === `invalid token`) {
      // verify the current token, refresh it if needed
      // then, re-init the socket client instance
      console.log(`getting new token and re-initing`);
      
    }

  });
}