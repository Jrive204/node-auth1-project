const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/user-model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(user =>
      user
        ? res.status(200).json(user)
        : res.status(400).json({ message: 'need name and password' })
    )
    .catch(err => res.status(600).json(err.message));
});
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    Users.getby({ username })
      .first()
      .then(user => {
        user && bcrypt.compareSync(password, user.password)
          ? (req.session.username = user.username) &
            (req.session.loggedin = true) &
            res.status(200).json({ message: `Welcome ${username}` })
          : res.status(401).json({ message: 'invalid credentials' });
      })
      .catch(error => res.status(500).json(error.message));
  } else {
    res.status(400).json({ error: 'You shall not pass' });
  }
});

router.get('/logout', (req, res) => {
  req.session
    ? req.session.destroy(err => {
        err
          ? res
              .status(500)
              .json({ you: 'can checkout anytime but never leave' })
          : res.status(200).json({ message: 'goodbye' });
      })
    : res.status(200).json({ message: 'goodbye' });
});

module.exports = router;
