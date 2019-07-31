const express = require('express');
const massive = require('massive');

const users = require('../controllers/users')

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
  app.post('/register', users.create);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});