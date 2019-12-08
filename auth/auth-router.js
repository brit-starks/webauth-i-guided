// Bound to /api/auth

const router = require('express').Router();
const bcrypt = require('bcryptjs');

// We're going to need to the user model to access the database
const Users = require('../users/users-model.js');




router.post('/register', (req, res) => {
  let user = req.body;
  // hashSync is a synchronous method, hash is asynchronous
  const hash = bcrypt.hashSync(user.password, 10);
// Before we send our password to the database, we want to 
// save the hash as the password. Replace our plain text as a hash
user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//  /api/auth/login
router.post('/login', (req, res) => {
  // 1. De-structure username and password from the body
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    // This will contain the user obj: username, password that stored in the DB
    .then(user => {

      //  We want to see if the user exists and check that the hash from the guess password
      // is the same as hash in database (user.password)
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
