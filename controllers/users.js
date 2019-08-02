const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

function register(req, res) {
    const db = req.app.get('db');
    const { firstName, lastName, username, email, password } = req.body;
    argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
          firstName,
          lastName,
          username,
          email,
          password: hash,
        },
        {
          fields: ['id', 'firstName', 'lastName', 'username', 'email'],
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret); // adding token generation
      res.status(201).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
  
    db.users
      .findOne(
        {
          username,
        },
        {
          fields: ['id', 'username', 'email', 'password'],
        }
      )
      .then(user => {
        if (!user) {
          throw new Error('Invalid username');
        }
  
        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password');
          }
  
          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password; // remove password hash from returned user object
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (['Invalid username', 'Incorrect password'].includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }
  
  function addContact(req, res){
    const db = req.app.get('db');
    const { first_name, last_name, home_phone,	mobile_phone,	work_phone,	email,	city,	state_or_province, postal_code,	country } = req.body;
    db.contact
    .insert(
      {
        first_name, 
        last_name, 
        home_phone,	
        mobile_phone,
        work_phone,	
        email,	
        city,	
        state_or_province, 
        postal_code,	
        country
      },
     
    )
    .then(contact => res.status(201).json(contact))
    .catch(err => {
      console.error(err);
    });
  }

  function listContact(req, res) {
    const db = req.app.get('db');
  
    db.contact
      .find()
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
  

  function protected(req, res) {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
   
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret); // will throw an Error when token is invalid!!!
      res.status(200).json({ data: 'here is the protected data' });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
   }
  
  module.exports = {
    register,
    login,
    protected,
    addContact,
    listContact
  };
  
  // server/index.js - register the handler
  
