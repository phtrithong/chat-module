import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const isEnvFound = dotenv.config();

if(isEnvFound.error) {
  throw new Error("Couldn't found .env file");
}

export default {
  server_host: process.env.SERVER_HOST,
  server_port: parseInt(process.env.SERVER_PORT, 10)
}