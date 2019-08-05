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
    const user_id = req.params.user
    const { first_name, last_name, home_phone,	mobile_phone,	work_phone,	email,	city,	state_or_province, postal_code,	country } = req.body;
    const temp = [];
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
        country,
      }
    )
    .then(data=>{
        temp.push(data);
        let contact_id = data.id;
        // console.log(userId,"-",contactId);
        
        db.address_book
        .insert(
          {
            user_id,
            contact_id,
          }
        ).then(add=>{
          // console.log(add)
          temp.push(add)
          res.status(201).json(temp)
        })
    })
    // .catch(err => {
    //   console.error(err);
    // });
  }

  function listContact(req, res) {

    const db = req.app.get('db');
    const userID = req.query.id;
    // console.log(req.query.id)
    db
    .query(
      `Select contact.* from users, contact, address_book WHERE users.id = address_book.user_id AND contact.id = address_book.contact_id AND users.id = ${userID} ORDER BY contact.first_name`,
      {
        id:req.query.id
      }
    )
    .then(data=>{
      res.status(200).json(data)
    })
  }

  function sortContact(req, res) {
    const db = req.app.get('db');
    const userID = req.query.id;
    // console.log(req.query.id)
    db
    .query(
      `Select contact.* from users, contact, address_book WHERE users.id = address_book.user_id AND contact.id = address_book.contact_id AND users.id = ${userID} ORDER BY contact.last_name`,
      {
        id:req.query.id
      }
    )
    .then(data=>{
      res.status(200).json(data)
    })
  }

  function updateContact(req, res){
    const db = req.app.get('db');

    const {
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
    } = req.body;

    db.contact
    .update(
      {
        id: req.query.cid
      },
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
      }
    )
    .then(data =>{
      res.status(201).json(data)
    })
    .catch(err => {
      console.error(err);
    })
  }

  function contactById(req, res) {
    const db = req.app.get('db');
  
    db.contact
      .findOne(req.params.id)
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  } 

  function deleteContact(req, res){
    const db = req.app.get('db');
    const contactId = req.params.id;
    db.query(`DELETE FROM address_book WHERE contact_id=${contactId}`)
    .then(() => {
    db.query(`DELETE FROM contact WHERE id=${contactId}`)
    })
    .then(response => {
      res.status(200).json(response);
    }).catch(err => {
      console.log(err)
      res.status(500).end()
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
    listContact,
    contactById,
    deleteContact,
    sortContact,
    updateContact
    // sampleClick
  };
  
  // server/index.js - register the handler
  
