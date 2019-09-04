exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('restaurant', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('location');
            table.decimal('lat');
            table.decimal('lng');
            table.text('map');
            table.text('about');
            table.integer('phone');
            table.string('website');
            table.string('price');
            table.string('hours');
            table.string('img');
            table.text('short_desc');
            table.integer('rating');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('password');
            table.text('img');
            table.string('email');
            table.timestamps(false, true);
        })
    ]);
}
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users').then(() => {
        return knex.schema.dropTable('restaurant')
    });
}

