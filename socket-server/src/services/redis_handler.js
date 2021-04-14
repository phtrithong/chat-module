import { RedisHandler } from '../../../lib/cache/index.js';
import config from '../config/index.js';

const redisHandler = new RedisHandler({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPass
});

export default redisHandler;
