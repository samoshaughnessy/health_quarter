class MealService {

    constructor(knex) {
        this.knex = knex;
    }

    listMeal(restID) { // List all meal plans of current restaurant
        let query = this.knex
            .select('meal_plan.id', 'meal_plan.name', 'meal_plan.img', 'meal_plan.about', 'meal_plan.created_at')
            .from('meal_plan')
            .innerJoin('restaurant', 'meal_plan.rest_id', 'restaurant.id')
            .where('restaurant.id', restID)
            .orderBy('meal_plan.name');

        return query.then(rows => {
            return rows.map(row => ({
                    id: row.id,
                    name: row.name,
                    img: row.img,
                    about: row.about,
                    date: row.created_at
                })
            )}
        )
    }

    listAllMeal() { // List all meal plans in DB
        let query = this.knex
            .select('meal_plan.id', 'meal_plan.name', 'meal_plan.img', 'meal_plan.about', 'restaurant.id as rest_id')
            .from('meal_plan')
            .innerJoin('restaurant', 'meal_plan.rest_id', 'restaurant.id')
            .orderBy('meal_plan.name');

        return query.then(rows => {
            return rows.map(row => ({
                    id: row.id,
                    name: row.name,
                    img: row.img,
                    about: row.about,
                    rest_id: row.rest_id
                    // date: row.created_at
                })
            )
        })
    }

}

module.exports = MealService;
