const router = require('express').Router();
const Users = require('./user-model');

router.get('/', (req, res) => {
  Users.get()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err.message));
});

module.exports = router;
