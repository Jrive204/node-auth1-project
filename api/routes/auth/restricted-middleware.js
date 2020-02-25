// const bcrypt = require('bcryptjs');
// const Users = require('../users/user-model');

module.exports = (req, res, next) => {
  req.session && req.session.loggedin
    ? next()
    : res.status(500).json({ message: 'No Auth' });

  // let { username, password } = req.headers;
  // if (username && password) {
  //   Users.getby({ username })
  //     .first()
  //     .then(user => {
  //       user && bcrypt.compareSync(password, user.password)
  //         ? next()
  //         : res.status(401).json({ message: 'You shall not pass' });
  //     })
  //     .catch(error => res.status(500).json(error.message));
  // } else {
  //   res.status(400).json({ error: 'You shall not pass' });
  // }
};
