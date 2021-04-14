import { RabbitHandler } from '../../../lib/mq/index.js';
import config from '../config/index.js';

const rabbitHandler = new RabbitHandler({
  host: config.rabbitHost,
  port: config.rabbitPort,
  user: config.rabbitUser,
  pass: config.rabbitPass
});


export default rabbitHandler;
