exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'rowValue1', password: 'testing!!!' },
        { username: 'rowValue2', password: 'testing!!!' },
        { username: 'rowValue3', password: 'testing!!!' }
      ]);
    });
};
