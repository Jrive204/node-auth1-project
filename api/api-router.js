const bcrypt = require('bcryptjs');
const router = require('express').Router();
const authRouter = require('./routes/auth/auth-router');
const userRouter = require('./routes/users/user-router');
const restricted = require('../api/routes/auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restricted, userRouter);

module.exports = router;
