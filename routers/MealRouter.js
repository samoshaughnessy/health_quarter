const express = require('express');

class MealRouter {
    constructor(mealService) {
        this.mealService = mealService;
    }

    router() {
        let router = express.Router();

        router.get('/', (req, res) =>{ // Get all meals in DB
            this.mealService.listAllMeal()
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:restID', (req, res) => { // Get all meals of current restaurant
            this.mealService.listMeal(req.params.restID)
                .then((meals) => res.json(meals))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = MealRouter;