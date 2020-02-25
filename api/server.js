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
  resave: false,
  saveUninitialized: true, //related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false, // Should be true in Production
    httpOnly: true // true means JS can't touch the cookie
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

// Routes
const apiRouter = require('../api/api-router');

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', apiRouter);

module.exports = server;
