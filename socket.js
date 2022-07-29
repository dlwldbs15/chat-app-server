const SocketIO = require("socket.io");
const axios = require("axios");

module.exports = (server) => {
    const io = SocketIO(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        }
      });
    //const mongoAdapter = require('socket.io-adapter-mongo');
    //io.adapter(mongoAdapter('mongodb://localhost:27017/OpenChatDB'));
    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속 : ', ip, socket.id);
        socket.on('disconnect', () => {
          socket.to(socket.room).emit('disconnected', 'out')
          console.log('접속 해제 : ', ip, socket.id);
        });
        socket.on('error', (error) => {
            console.error(error);
        });
        socket.on('leaveRoom', (roomId, name) => {
          if (roomId === null) {
            console.log('Room ID is undefined');  
          } else {
            socket.leave(roomId)
            io.to(roomId).emit('leaveRoom', name);
            console.log('Room <' + roomId + '> : [' + name + '] leaved');
          }
        });
        socket.on('joinRoom', (roomId, name) => {
          if (roomId === null) {
            console.log('Room ID is undefined');  
          }
          else {
            socket.join(roomId);
            io.to(roomId).emit('joinRoom', name);
            console.log('Room <' + roomId + '> : [' + name + '] join');
          }
        });
        socket.on('message', (roomId, name, msg, datetime) => {
            if (msg !== '')
            {
              io.to(roomId).emit('message', name, msg, datetime);
              console.log('Room <' + roomId + '> : [' + name + '] - ' + msg);
            }
        });
      });
}