const express = require('express');
const passport = require('passport');
const app = express();


class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        // Profile details services        
            router.get('/details', (req, res) => { // Get profile details of current user
                this.userService.getUserDetail(req.session.passport.user.id)
                    .then((userDetails) => res.json(userDetails))
                    .catch((err) => res.status(500).json(err));
            })

            router.put('/details', (req, res) => { // Update profile details of current user
                this.userService.updateUserDetail(req.session.passport.user.id,req.body.nickname,req.body.img)
                    .then((userDetails) => res.json(userDetails))
                    .catch((err) => res.status(500).json(err));
            })

        // Tag services    
            router.get('/tags/all',(req,res)=> { // List all available tags
                this.userService.listAllTags()
                    .then((tags) => res.json(tags))
                    .catch((err) => res.status(500).json(err));
            });

            router.get('/tags/fav',(req,res)=> { // Get fav tags of current user
                this.userService.getFavTags(req.session.passport.user.id)
                    .then((favTags) => res.json(favTags))
                    .catch((err) => res.status(500).json(err));
            });

            router.delete('/tags/fav',(req,res)=> { // Clear all fav tags of current user
                this.userService.clearFavTags(req.session.passport.user.id)
                    .then((favTag) => res.json(favTag))
                    .catch((err) => res.status(500).json(err));
            });

            router.put('/tags/fav',(req,res)=> { // Update current user's fav tags (inserting after clearing)
                this.userService.insertFavTag(req.session.passport.user.id,req.body.tag.tag_id)
                    .then((favTag) => res.json(favTag))
                    .catch((err) => res.status(500).json(err));
            });

        // User's review services
            router.get('/review', (req, res) => { // List all reviews submitted by current user
                this.userService.listOwnReview(req.session.passport.user.id)
                    .then((reviews) => res.json(reviews))
                    .catch((err) => res.status(500).json(err));
                });

            router.put('/review/:reviewID', (req, res) => { // Update target review
                this.userService.updateReview(req.params.reviewID,req.body.comment,req.body.rating)
                    .then((review) => res.json(review))
                    .catch((err) => res.status(500).json(err));
                });

            router.delete('/review/:reviewID', (req, res) => { // Delete target review
                this.userService.deleteReview(req.params.reviewID)
                    .then((review) => res.json(review))
                    .catch((err) => res.status(500).json(err));
                });

        return router;
    }
}

module.exports = UserRouter;