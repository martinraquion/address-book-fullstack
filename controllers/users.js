function create(req, res) {
    const db = req.app.get('db');
  
    const { firstName, lastName, username, email, password } = req.body;
  
    db.users // heres the new stuff, using massive to actually query the database.
      .save({
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then(user => res.status(201).json(user)) // returns a promise so we need to use .then
      .catch(err => {
        console.error(err); // if something happens we handle the error as well.
        res.status(500).end();
      });
  }
  
  module.exports = {
    create,
  };
  
  // server/index.js - register the handler
  
