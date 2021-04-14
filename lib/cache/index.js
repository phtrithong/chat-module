// ./lib/cache/index.js
import { promisify } from 'util';
import redis from 'redis';

export class RedisHandler {
  constructor({
    host, port, password
  }) {
    this.redisClient = redis.createClient({
      host: host,
      port: port,
      password: password
    });

    this.redisClient.on('connect', () => {
      console.log(`redis client connected`);
    })

    this.redisClient.on('error', (err) => {
      console.log('error', err);
    });
  }

  get() {
    let args = Array.from(arguments);
    let redisGet = promisify(this.redisClient.get).bind(this.redisClient);
    return redisGet(...args);
  }

  set() {
    let args = Array.from(arguments);
    let redisSet = promisify(this.redisClient.set).bind(this.redisClient);
    return redisSet(...args);
  }

  del() {
    let args = Array.from(arguments);
    let redisDel = promisify(this.redisClient.del).bind(this.redisClient);
    return redisDel(...args);
  }

  keys() {
    let args = Array.from(arguments);
    let redisKeys = promisify(this.redisClient.keys).bind(this.redisClient);
    return redisKeys(...args);
  }
}