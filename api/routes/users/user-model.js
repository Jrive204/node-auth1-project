const db = require('../../../data/dbConfig');

module.exports = { get, add, getbyid, getby };

function get() {
  return db('users');
}

function getbyid(id) {
  return db('users')
    .select('id', 'username', 'password')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      console.log(ids, 'hi');
      const [id] = ids;
      return getbyid(id);
    });
}

function getby(filter) {
  return db('users').where(filter);
}
