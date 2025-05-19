// node.js + socket.io server

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a player connected:', socket.id);

  socket.on('playerInput', (data) => {
    // TODO: update server-side game state
    // broadcast input to others for now
    socket.broadcast.emit('playerInput', { id: socket.id, input: data });
  });

  socket.on('disconnect', () => {
    console.log('player disconnected:', socket.id);
    socket.broadcast.emit('playerLeft', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
