# Chat server-client using socket.io@3

## Prerequisities

- node.js
- rabbitmq: for intercom through services
- redis: for caching user online status or chat messages (optional)

## Modules

- handlers (methods to interact with the chat-server)
- socket-server (socket-server)
- socket-client (an example for a socket-client)

## Installation

### 1. Set up EC2 instance (Ubuntu)
- Use the "Ubuntu Server 18.04 LTS (HVM), SSD Volume Type" instance type.
![](/docs/images/ec2_set_up.png)

### 2. Install `docker` and `docker-compose`

  ```bash
  bash ./docker_installation.sh
  ```

### 3. Install Node.js (v12)

  ```bash
  bash nodejs_installation.sh
  ```

### 4. Install and run `rabbit_mq` and `redis` for the socker-server

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

![](/docs/images/check_rabbit_redis.png)

## Handlers for integration

### For WebSocker server

Search for `serverHandleMessage` to see how the server handle the chat message

Search for `clientSendMessage` to see how the client send the chat message
Search for `clientRenderMessage` to see how  the client listen to the chat message, parse it and render the view for it

### For API server

Search for `createChatRoom` to see on how the API server handle a user request for creating a new chat room
Search for `leaveUserFromChatRoom` to see how the API server handle to leave a user from a chat room

## Demo

- Start the **socket-server**

```bash
cd socket-server
npm install
cp .env.example .env
npm run start:dev
```

- Start the **socker-client**

```bash
cd socket-client
npm install
cp .env.example .env
npm run start:dev
```

- Leave a user from a room

  - In the demo, the user with `userId='sylId` joined to 2 rooms: `6075d914390dfe6e8c0495e7` and `6075d91e7d7a0e01884a24de`
  
  - Example for leaving user from a room
  
  ```bash
  cd handlers
  npm install
  cp .env.example .env
  node ./example/leave_room.js
  ```

- Create a new room for users

  - In the demo, a new room will be create for 3 users: `sylId`, `jaxId` and `joeId`

  - Example for creating a new room for users
  
  ```bash
  cd handlers
  npm install
  cp .env.example .env
  node ./example/create_room.js
  ```
