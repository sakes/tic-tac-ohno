const express = require('express');
const cors = require('cors');

const PORT = process.env.REST_PORT || 3001;

const createRestServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // REST API
  app.get('/api', (req, res) => {
      res.json({ message: 'Hello from server!' });
    });
  
  // LISTEN
  app.listen(PORT, () => {
    console.log(`REST listening on port ${PORT}`);
  });
}

module.exports = {
  createRestServer
}
