exports.up = function(knex, Promise) {
  
    return Promise.all([
      knex.schema.alterTable('reviews', (t) => {
        t.bigInteger('userid').unsigned().index().references('id').inTable('users');
      })
    ])
  };
  
exports.down = function(knex, Promise) {
  
    return Promise.all([
      knex.schema.alterTable('reviews', (t) => {
        t.dropColumn('userid');
      }),
    ])
};