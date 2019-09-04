const express = require('express');

class FavRouter {
    constructor(favService) {
        this.favService = favService;
    }

    router() {
        let router = express.Router();

        // Check favourite status
            router.get('/rest/:restID', (req, res) => { // Of restaurant
                this.favService.isFavRest(req.params.restID, req.session.passport.user.id)
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/dish/:dishID', (req, res) => { // Of dish
                this.favService.isFavDish(req.params.dishID, req.session.passport.user.id)
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/meal/:mealID', (req, res) => { // Of meal plan
                this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id)
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/recipes/:recURL', (req, res) => { // Of recipe
                this.faveService.isFavRec(req.params.recURL, req.session.passport.user.id)
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

        // Update favourite status (add to or delete record from DB)
            router.post('/rest/:restID', (req, res) => { // Add fav restaurant
                this.favService.addFavRest(req.params.restID, req.session.passport.user.id)
                    .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.delete('/rest/:restID', (req, res) => { // Remove fav restaurant
                this.favService.delFavRest(req.params.restID, req.session.passport.user.id)
                    .then(() => this.favService.isFavRest(req.params.restID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.post('/dish/:dishID', (req, res) => { // Add fav dish
                this.favService.addFavDish(req.params.dishID, req.session.passport.user.id)
                    .then(() => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.delete('/dish/:dishID', (req, res) => { // Remove fav dish
                this.favService.delFavDish(req.params.dishID, req.session.passport.user.id)
                    .then(() => this.favService.isFavDish(req.params.dishID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.post('/meal/:mealID', (req, res) => { // Add fav meal plan
                this.favService.addFavMeal(req.params.mealID, req.session.passport.user.id)
                    .then(() => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.delete('/meal/:mealID', (req, res) => { // Remove fav meal plan
                this.favService.delFavMeal(req.params.mealID, req.session.passport.user.id)
                    .then(() => this.favService.isFavMeal(req.params.mealID, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err) => res.status(500).json(err));
            })

            router.post('/recipes', (req, res) => { // Add fav recipe
                this.favService.addFavRec(req.body.recURL, req.session.passport.user.id)
                    .then(() => this.favService.isFavRec(req.body.recURL, req.session.passport.user.id))
                    .then((status) => res.json(status))              
                    .catch((err) => res.status(500).json(err));
            })

            router.delete('/recipes', (req, res)=>{ // Remove fav recipe
                this.favService.delFavRec(req.body.recURL, req.session.passport.user.id)
                    .then(()=> this.favService.isFavRec(req.body.recURL, req.session.passport.user.id))
                    .then((status) => res.json(status))
                    .catch((err)=> res.status(500).json(err));
            })

        // Favourite page listing
            router.get('/restaurants', (req, res) => { // List all favourite restaurants
                this.favService.listFavRest(req.session.passport.user.id)
                    .then((restaurants) => res.json(restaurants))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/dishes', (req, res) => { // List all favourite dishes
                this.favService.listFavDish(req.session.passport.user.id)
                    .then((dishes) => res.json(dishes))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/meals', (req, res) => { // List all favourite mea plans
                this.favService.listFavMeal(req.session.passport.user.id)
                    .then((meals) => res.json(meals))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/recipes', (req, res) => { // List all favourite recipes
                this.favService.listFavRec(req.session.passport.user.id)
                    .then((recURLs) => res.json(recURLs))
                    .catch((err) => res.status(500).json(err));
            })

        // Personalised home page content retrieval
        router.get('/preference', (req, res) => { // Get all fav tags of current users (for restaurants listing)
            this.favService.listFavTag(req.session.passport.user.id)
                .then((tags) => res.json(tags))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = FavRouter;