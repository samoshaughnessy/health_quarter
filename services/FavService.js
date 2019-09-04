class FavService {

    constructor(knex) {
        this.knex = knex;
    }

    // @ Add to favourite button

        // For status display
        isFavRest(restID, userID) {
            let query = this.knex
            .select()
            .from('users_fav_restaurant')
            .where('users_id',userID) 
            .andWhere('rest_id',restID)

            return query.then((rows) => {
                if (rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        isFavDish(dishID, userID) {
            let query = this.knex
            .select()
            .from('users_fav_dish')
            .where('users_id',userID)
            .andWhere('dish_id',dishID)

            return query.then((rows) => {
                if (rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        isFavMeal(mealID, userID) {
            let query = this.knex
            .select()
            .from('users_fav_meal_plan')
            .where('users_id',userID)
            .andWhere('meal_plan_id',mealID)

            return query.then((rows) => {
                if (rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        isFavRec(recURL, userID) {
            let query = this.knex
            .select()
            .from('users_fav_recipe')
            .where('users_id', userID)
            .andWhere('api_url', recURL)
            return query.then((rows) => {
                if (rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        // For status update
        addFavRest(restID, userID) {
            return this.knex("users_fav_restaurant").insert({"users_id":userID,"rest_id":restID})
            // .then(()=> {
            //     let query = this.knex
            //     .select()
            //     .from('users_fav_restaurant')
            //     .where('users_fav_restaurant.users_id',userID)
            //     .andWhere('users_fav_restaurant.rest_id',restID)

            //     return query.then(rows => {
            //         while (rows.length !== 1) {
            //             return this.delFavRest(restID, userID);
            //         }
            //     })
            // })
        }

        delFavRest(restID, userID) {
            return this.knex("users_fav_restaurant")
            .where("users_id",userID)
            .andWhere("rest_id",restID)
            .delete()
        }

        addFavDish(dishID, userID) {
            return this.knex("users_fav_dish").insert({"users_id":userID,"dish_id":dishID})
        }

        delFavDish(dishID, userID) {
            return this.knex("users_fav_dish")
            .where("users_id",userID)
            .andWhere("dish_id",dishID)
            .delete()
        }

        addFavMeal(mealID, userID) {
            return this.knex("users_fav_meal_plan").insert({"users_id":userID,"meal_plan_id":mealID})
        }

        delFavMeal(mealID, userID) {
            return this.knex("users_fav_meal_plan")
            .where("users_id",userID)
            .andWhere("meal_plan_id",mealID)
            .delete()
        }

        addFavRec(recURL, userID) {
            return this.knex('users_fav_recipe').insert({"users_id":userID,"api_url":recURL})
        }

        delFavRec(recURL, userID) {
            return this.knex('users_fav_recipe')
            .where('users_id',userID)
            .andWhere('api_url',recURL)
            .delete()
        }

    // @ Favourite page

        // For listing
        listFavRest(userID) {  
            let query = this.knex // Eliminate duplicated restaurants
                .distinct('rest_id')
                .select()
                .from('users_fav_restaurant')
                .where('users_fav_restaurant.users_id',userID);
    
            return query.then(rows => {
                return rows.map(row => ({
                    rest_id: row.rest_id,
                    name: null,
                    img: null,
                    rating: null,
                    price: null
                }))
            })
            .then(rows => { // Get restaurant details by ID
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                        .select('restaurant.id','restaurant.name','restaurant.img','restaurant.rating','restaurant.price')
                        .from('restaurant')
                        .where('restaurant.id',row.rest_id)
                        .orderBy('restaurant.name')
    
                        return query.then(restRows => {
                            restRows.forEach(restRow => {
                                row.name = restRow.name;
                                row.img = restRow.img;
                                row.rating = restRow.rating;
                                row.price = restRow.price;
                            });
                            return row;
                        })
                    })
                )
            })
        }

        listFavDish(userID) {
            let query = this.knex
            .select('restaurant.id as rest_id','dish.id','dish.name','dish.img')
            .from('dish')
            .innerJoin('users_fav_dish', 'dish.id', 'users_fav_dish.dish_id')
            .innerJoin('restaurant','dish.rest_id', 'restaurant.id')
            .where('users_fav_dish.users_id',userID)
            .orderBy('users_fav_dish.created_at','desc');

            return query.then((rows) => {
                return rows.map(row => ({
                    rest_id: row.rest_id,
                    id: row.id,
                    name: row.name,
                    img: row.img
                }))
            })
        }

        listFavMeal(userID) {
            let query = this.knex
            .select('restaurant.id as rest_id','meal_plan.id','meal_plan.name','meal_plan.img')
            .from('meal_plan')
            .innerJoin('users_fav_meal_plan', 'meal_plan.id', 'users_fav_meal_plan.meal_plan_id')
            .innerJoin('restaurant','meal_plan.rest_id', 'restaurant.id')
            .where('users_fav_meal_plan.users_id',userID)
            .orderBy('users_fav_meal_plan.created_at','desc');

            return query.then((rows) => {
                return rows.map(row => ({
                    rest_id: row.rest_id,
                    id: row.id,
                    name: row.name,
                    img: row.img
                }))
            })
        }

        listFavRec(userID) {
            let query = this.knex.select('api_url')
            .from('users_fav_recipe')
            .where('users_id',userID)
            return query.then(rows => {
                return rows.map(row => ({
                    recURL: row.api_url,
                }))
            })
        }

    // For personalised home page & preference setting @ sign up / user profile 
        listFavTag(userID) {
            let query = this.knex
            .select('tag.id', 'tag.name')
            .from('users_fav_tag')
            .where('users_id',userID)
            .innerJoin('tag', 'tag_id', 'tag.id')
            .orderBy('tag.name');

            return query.then(rows => {
                return rows.map(row => ({
                    id: row.id,
                    name: row.name
                }))
            })
        }

}

module.exports = FavService;