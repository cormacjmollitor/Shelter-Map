exports.up = function(knex, Promise) {
  knex('reservations').del();

  return Promise.all([
    knex.schema.alterTable('reservations', (t) => {
      t.dropColumn('starttime');
      t.dropColumn('endtime');
    }),
    knex.schema.alterTable('reservations', (t) => {
      t.bigInteger('starttimeunix', null);
      t.bigInteger('endtimeunix', null);
    })
  ])
};

exports.down = function(knex, Promise) {
  knex('reservations').del();

  return Promise.all([
    knex.schema.alterTable('reservations', (t) => {
      t.dropColumn('starttimeUNIX');
      t.dropColumn('endtimeUNIX');
    }),
    knex.schema.alterTable('reservations', (t) => {
      t.timestamp('starttime');
      t.timestamp('endtime');
    })
  ])
};