const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const { Pool } = require('pg');

const PORT = process.env.WS_PORT || 3002;

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
      
        socket.on('message', async (msg) => {
          console.log('Message received:', msg);
          // Echo the message back
          const data = await pool.query('select txt from hello_world');
          console.log(JSON.stringify(data));
          io.emit('message', 'Message received: ' + data.rows[0]?.txt || ' no data');
        });
      });      
    
      server.listen(PORT, () => {
        console.log('WS Listening on *:3002');
      });
}

module.exports = {
    createWsServer
}