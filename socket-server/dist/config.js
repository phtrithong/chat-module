"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = process.env.NODE_ENV || "development";

var isEnvFound = _dotenv2.default.config();

if (isEnvFound.error) {
  throw new Error("Couldn't found .env file");
}

exports.default = {
  port: parseInt(process.env.PORT, 10)
};