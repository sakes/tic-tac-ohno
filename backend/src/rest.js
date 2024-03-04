const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const Users = require('./database/users');

const PORT = process.env.REST_PORT || 3001;

const createRestServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  const pool = new Pool();

  // REST API
  app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
  });

  app.post('/api/login', async (req, res) => {
    const { username } = req.body;
    const user = await Users.login(pool, username);
    res.json(user);
  });

  // LISTEN
  app.listen(PORT, () => {
    console.log(`REST listening on port ${PORT}`);
  });
}

module.exports = {
  createRestServer
}
