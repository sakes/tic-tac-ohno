const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const { Pool } = require('pg');

const attachUser = require('./user');
const attachGames = require('./games');
const attachLeaderboards = require('./leaderboards');

const PORT = process.env.WS_PORT || 3002;

// 192.168.1.250
const createWsServer = () => {
    const app = express();
    app.use(cors());
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
          origins: ["http://192.168.1.250:8080", "http://localhost:8080"], 
          methods: ["GET", "POST"]
        }
      });

    const pool = new Pool();

    io.on('connection', (socket) => {
        console.log('A user connected');
      
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });

        attachUser(io, socket, pool);
        attachGames(io, socket, pool);
        attachLeaderboards(io, socket, pool);
      });      
    
      server.listen(PORT, () => {
        console.log('WS Listening on *:3002');
      });
}

module.exports = {
    createWsServer
}