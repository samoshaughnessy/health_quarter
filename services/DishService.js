class DishService {

    constructor(knex) {
        this.knex = knex;
    }

    listDish(restID) { // List all dishes of current restaurant
        let query = this.knex
        .select('dish.id','dish.name','dish.img')
        .from('dish')
        .innerJoin('restaurant', 'dish.rest_id', 'restaurant.id')
        .where('restaurant.id', restID)
        .orderBy('dish.name');

        return query.then((rows) => {
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
            }))
        })
    }

    getDishDetail(dishID) { // Get dish details of current dish
        let query = this.knex
        .select(
            'dish.id',
            'dish.name',
            'dish.img',
            'rest_id'
        )
        .from('dish')
        .where('dish.id', dishID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
                rest: row.rest_id
            }));
        });
    }

}

module.exports = DishService;