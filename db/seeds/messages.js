exports.seed = function(knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return Promise.all([
        knex('messages').insert({content: 'Hello I will be 5 minutes late'}),
        knex('messages').insert({content: 'I might be there 10 minutes early , any way I could gain access early'}),
      ]);
    });
};
