const express = require('express');
const session = require('express-session'); // npm i express-session

const KnexStore = require('connect-session-knex')(session); // remember to curry and pass the session -----  comes after session !!Important
// const Knex = require('../data/dbConfig'); //needed for storing sessions, access to Database
const Knex = require('knex');

const server = express();

const knex = Knex({
  client: 'pg',
  connection: {
    database: 'auth'
  }
});

const sessionConfig = {
  name: 'Authproject',
  secret: 'SUPER SECRET NAME',
  resave: true,
  saveUninitialized: true, //related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false, // Should be true in Production
    httpOnly: false // true means JS can't touch the cookie
  },
  //    REMEBER the new Keyword

  store: new KnexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: ' sid',
    clearInterval: 1000 * 60 * 20
  })
};
// Middleware ----
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const config = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
};

// Routes
const apiRouter = require('../api/api-router');

server.use(morgan('dev'));
server.use(helmet());
server.use(cors(config));
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.json({ message: 'WELCOME to Auth project' });
});
server.get('/cookie', cors(config), (req, res) => {
  const options = {
    secure: false,
    httpOnly: true,
    domain: 'http://localhost:5000/'
  };
  return res
    .cookie('cookieName', 'cookieValue', options)
    .status(200)
    .send('cookie sent');
});

module.exports = server;
