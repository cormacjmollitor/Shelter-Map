
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('parkingspots', (t) => {
      t.decimal('longitude', null).alter();
      t.decimal('latitude', null).alter();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('parkingspots', (t) => {
      t.decimal('longitude').alter();
      t.decimal('latitude').alter();
    })
  ])
};
