exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('restaurant_tag', function (table) {
            table.increments('id').primary();

            //FK: rest.id 
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');

            //FK: tag.id 
            table.integer('tag_id').unsigned();
            table.foreign('tag_id').references('tag.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_fav_restaurant', function (table) {
            table.increments('id').primary();

            //FK: rest.id
            table.integer('rest_id').unsigned();
            table.foreign('rest_id').references('restaurant.id');

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_fav_meal_plan', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: meal_plan.id
            table.integer('meal_plan_id').unsigned();
            table.foreign('meal_plan_id').references('meal_plan.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_fav_recipe', function (table) {
            table.increments('id').primary();
            table.string('api_url');

            //FK: users.id
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_fav_dish', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: dish.id 
            table.integer('dish_id').unsigned();
            table.foreign('dish_id').references('dish.id');
            table.timestamps(false, true);
        }),

        knex.schema.createTable('users_fav_tag', function (table) {
            table.increments('id').primary();

            //FK: users.id 
            table.integer('users_id').unsigned();
            table.foreign('users_id').references('users.id');

            //FK: dish.id 
            table.integer('tag_id').unsigned();
            table.foreign('tag_id').references('tag.id');
            table.timestamps(false, true);
        }),
    ]);
}

//reverse order 
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users_fav_tag').then(() => {
        return knex.schema.dropTable('users_fav_dish')
    }).then(() =>{
        return knex.schema.dropTable('users_fav_recipe')
    }).then(() =>{
        return knex.schema.dropTable('users_fav_meal_plan')
    }).then(() =>{
        return knex.schema.dropTable('users_fav_restaurant')
    }).then(() =>{
        return knex.schema.dropTable('restaurant_tag')
    });
}
