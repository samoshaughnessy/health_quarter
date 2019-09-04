const express = require('express');

class RestRouter {
    constructor(restService) {
        this.restService = restService;
    }

    router() {
        let router = express.Router();

        // Restaurant services
            router.get('/tag/:tagID', (req, res) => { // Get list of restaurants by tag
                this.restService.listRestByTag(req.params.tagID)
                    .then((restaurants) => res.json(restaurants))
                    .catch((err) => res.status(500).json(err));
            })

            // router.get('/location/:coord', (req, res) => { // Get restaurant by geo location --> To be implemented
            //     this.restService.listRestByGeo(req.params.coord)
            //         .then((restaurants) => res.json(restaurants))
            //         .catch((err) => res.status(500).json(err));
            // })

        // Restaurant details service
            router.get('/detail/:restID', (req, res) => { // Get details of current restaurant
                this.restService.getRestDetail(req.params.restID)
                    .then((restDetail) => res.json(restDetail))
                    .catch((err) => res.status(500).json(err));
            })

            router.get('/rating/:restID', (req, res) => { // Get details of current restaurant
                this.restService.getRestRating(req.params.restID)
                    .then((restDetail) => res.json(restDetail))
                    .catch((err) => res.status(500).json(err));
            })

        // Review servcies
            router.get('/review/:restID', (req, res) => {  // Get reviews of current restaurant
                this.restService.listReview(req.params.restID)
                    .then((reviews) => res.json(reviews))
                    .catch((err) => res.status(500).json(err));
            })

            router.post('/review/:restID', (req, res) => { // Add a review for current restaurant
                this.restService.addReview(req.body.comment,req.body.rating,req.session.passport.user.id,req.params.restID)
                    .then(() => this.restService.listReview(req.params.restID))
                    .then((reviews) => res.json(reviews))
                    .catch((err) => res.status(500).json(err));
            })

        return router;
    }
}

module.exports = RestRouter;