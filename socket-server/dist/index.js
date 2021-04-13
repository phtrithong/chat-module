"use strict";

var _socket = require("socket.io");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// socket.io@3
var options = {
  // path is the endpoint used for init (handshake) the connection
  // path must be matched on the client-side
  path: "/ws" // default is "/socket.io"
};

var io = new _socket.Server(_config2.default.port, options);
var rootNsp = io.of("/");

// middleware for validation
io.use(function (socket, next) {
  try {
    // auth is an obj passed by the client when init (handshake) the connection
    // auth obj can be modified
    var auth = socket.handshake.auth;

    console.log('auth :>> ', auth);

    var token = auth.token;

    // change this to the current authn mechanism 
    // (as if with jwt) verify the token, parse the token which contains the userId
    // -------------- example -------------- //

    if (token === "sylToken") {
      var parsedToken = {
        userId: "sylId",
        userName: "syl"
      };

      // bind the userId to the initializing socket for later authz
      socket.userId = parsedToken.userId;
      return next();
    } else {
      // throw the error to the socket client instance
      return next(new Error("invalid token"));
    }
    // ------------------------------------- //
  } catch (err) {
    logger.error(err);
    // disconnect the socket client
    socket.disconnect(true);
    return;
  }
});

rootNsp.on("connection", function (socket) {
  // socket is the initialized socket instance for the client

  console.log('socket :>> ', socket);
});