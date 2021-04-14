// socket.io@3
import { Server } from "socket.io";

const options = {
  path: `/ws` // default is "/socket.io"
}

export class SocketServer {
  constructor({
    port
  }) {
    this.server = new Server(port, options);
    console.log(`started socket server at port ${port}`);
    this.namespaces = {};
    this.namespaces['/'] = this.server.of('/')
  }

  addMiddleware(fn) {
    this.server.use(fn);
  }

  getServer() {
    return new Promise(async (resolve, reject) => {
      try {
        let server = this.server;
        return resolve(server);
      }
      catch(e) {
        return reject(e);
      }
    })
  }

  getRootNsp() {
    return new Promise(async (resolve, reject) => {
      try {
        let rootNsp = this.namespaces['/'];
        return resolve(rootNsp);
      }
      catch(e) {
        return reject(e);
      }
    })
  }

  getNsp({ nsp }) {
    return new Promise(async (resolve, reject) => {
      try {
        let namespace = this.namespaces[`${nsp}`];
        if(!namespace) {
          this.namespaces[`${nsp}`] = this.server.of(`${nsp}`);
          namespace = this.namespaces[`${nsp}`];
          return resolve(namespace);
        }
        else {
          return resolve(namespace);
        }
      }
      catch(e) {
        return reject(e);
      }
    })
  }

  setNspTopicListener({ nsp, topic, fn }) {
    return new Promise(async (resolve, reject) => {
      try {
        let namespace = await this.getNsp({ nsp });

        let listeners = namespace.listeners(topic);

        if(listeners.includes(fn)) {
          return resolve(true);
        }
        else {
          namespace.on(topic, fn);
          return resolve(true);
        }
      }
      catch(e) {
        return reject(e);
      }
    })
  }
}