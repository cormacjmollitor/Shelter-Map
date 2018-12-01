exports.seed = function(knex, Promise) {
  return knex('types').del()
    .then(function () {
      return Promise.all([
        knex('types').insert({cartype: 'moterbike'}),
        knex('types').insert({cartype: 'sedan/small pickup'}),
        knex('types').insert({cartype: 'full pickup/SUV'}),
        knex('types').insert({cartype: 'commericial'})
      ]);
    });
};
