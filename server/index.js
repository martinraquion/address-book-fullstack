const express = require('express');
const massive = require('massive');

const users = require('../controllers/users')
const cors = require("cors");



massive({
  host: 'localhost',
  port: 5432,
  database: 'addressbookdb',
  user: 'postgres',
  password: 'abdb',
}).then(db => {
  const app = express();

  app.set('db', db);

  app.use(express.json());
  app.use(cors());
  app.post('/api/login', users.login);
  app.post('/api/register', users.register);
  app.get('/api/data', users.protected)
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});