# Chat server-client using socket.io@3

## Prerequisities

- rabbitmq: for intercom through services
- redis: for caching user online status or chat messages (optional)

## Modules

- handlers (functions for the api server)
- socket-server (websocket server)
- socket-client (an example for a client)

## Installation

### 1. Set up EC2 instance (Ubuntu)


### 2. Install `docker` and `docker-compose`

  ```bash
  bash ./docker_installation.sh
  ```

### 3. Install and run `rabbit_mq` and `redis` for the socker-server

- Create and `./socket-server/.env` or clone the `./socket-server/.env.example`

```bash
cp ./socket-server/.env.example ./socket-server/.env
```

- Make sure **docker** and **docker-compose** is installed first

- Use `docker-compose` command for installation

```bash
cd ./socket-server
docker-compose --env-file ./.env up -d
```

- Check if the docker container of `rabbit_mq` and `redis` are installed

```bash
docker ps
```

## Handlers for integration

### For WebSocker server

Search for `serverHandleMessage` to see how the server handle the chat message

Search for `clientSendMessage` to see how the client send the chat message
Search for `clientRenderMessage` to see how  the client listen to the chat message, parse it and render the view for it

### For API server

Search for `createChatRoom` to see on how the API server handle a user request for creating a new chat room
Search for `leaveUserFromChatRoom` to see how the API server handle to leave a user from a chat room
