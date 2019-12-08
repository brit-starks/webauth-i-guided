// This is bound to our api router ('/api')

const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

// Two additional routers(endpoints) that will be used
// These are bout to our auth router and users router
// ('/api/auth)
router.use('/auth', authRouter);
// ('/api/users)
router.use('/users', usersRouter);

// Shows that our server is listening
router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
