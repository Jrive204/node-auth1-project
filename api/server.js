const express = require('express');
const server = express();
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

server.use('/api', apiRouter);

module.exports = server;
