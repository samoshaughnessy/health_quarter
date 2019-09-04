const express = require('express');

class DishRouter {
    constructor(dishService) {
        this.dishService = dishService;
    }

    router() {
        let router = express.Router();

        router.get('/rest/:restID', (req, res) => { // List all dishes of current restaurant
            this.dishService.listDish(req.params.restID)
                .then((dishes) => res.json(dishes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/detail/:dishID', (req, res) => { // Get dish details of current dish
            this.dishService.getDishDetail(req.params.dishID)
                .then((dishDetail) => res.json(dishDetail))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = DishRouter;