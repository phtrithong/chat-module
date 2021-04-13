'use strict';

var _socket = require('socket.io-client');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// socket.io-client@3
var rootNsp = '/';

var options = {
  path: "/ws", // default is "/socket.io"
  auth: {
    token: "123"
  },
  transports: ["websocket"]
};

console.log('config :>> ', _config2.default);

var rootNspSocket = (0, _socket.io)('ws://' + _config2.default.server_host + ':' + _config2.default.server_port + rootNsp, options);

// handler invoked when socket client is connected
rootNspSocket.on("connect", function () {});

rootNspSocket.on("disconnect", function (reason) {
  console.log('disconnect reason :>> ', reason);
});

rootNspSocket.on("connect_error", function (err) {
  console.log('connect_error err :>> ', err.message);
});