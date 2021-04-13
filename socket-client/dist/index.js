'use strict';

var _socket = require('socket.io-client');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// socket.io-client@3
var rootNsp = '/';

var options = {
  path: "/ws", // default is "/socket.io"
  auth: {},
  transports: ["websocket"]
};

console.log('config :>> ', _config2.default);

// obj argument
// -- token: the authn token of the user using this socket client instance
var initRootNspSocket = function initRootNspSocket(_ref) {
  var _ref$token = _ref.token,
      token = _ref$token === undefined ? "123" : _ref$token;

  options.auth.token = token;

  // declare the connection for the socket instance
  var rootNspSocket = (0, _socket.io)('ws://' + _config2.default.server_host + ':' + _config2.default.server_port + rootNsp, options);

  // handler invoked when socket client is connected
  rootNspSocket.on("connect", function () {
    console.log('socket client ' + rootNspSocket.id + ' connected');
  });

  rootNspSocket.on("disconnect", function (reason) {
    console.log('socket client ' + rootNspSocket.id + ' disconnected with reason', reason);
  });

  rootNspSocket.on("connect_error", function (err) {
    // handle the error message (the message is customized)
    // if invalid token
    if (err.message === 'invalid token') {
      console.log('getting new token and re-initing');
      // verify the current token, refresh it or re-login if needed
      // then, re-init the socket client instance

      // get the new token
      var newToken = "sylToken";

      // stop the current socket instance from trying  to reconnect
      rootNspSocket.disconnect();

      // init a new socket instance with the new token
      return initRootNspSocket({
        token: newToken
      });
    }

    if (err.message === 'websocket error') {}
  });
};

initRootNspSocket({});