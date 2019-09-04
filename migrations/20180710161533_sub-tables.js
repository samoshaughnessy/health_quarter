exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('meal_plan', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.text('about');
            table.string('img');

            //FK: rest.id 
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('dish', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('img');

            //FK: rest.id
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_review', function (table) {
            table.increments('id').primary();
            table.text('comment');
            table.integer('rating');

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: rest.id
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('tag', function (table) {
            table.increments('id').primary();
            table.string('name');

            //FK: rest.id
            // table.integer('rest_id').unsigned();
            // table.foreign('rest_id').references('restaurant.id');
            table.timestamps(false, true);
        }),
    ]);
}

//reverse order 
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tag').then(() => {
        return knex.schema.dropTable('users_review')
    }).then(() =>{
        return knex.schema.dropTable('dish')
    }).then(() =>{
        return knex.schema.dropTable('meal_plan')
    });
}

