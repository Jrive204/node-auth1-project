require('dotenv').config(); // load .env variables

const server = require('./api/server');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
