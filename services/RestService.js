class RestService {

    constructor(knex) {
        this.knex = knex;
    }

    // Restaurant services

    listRestByTag(tagID) {  // For generic home page content
        let query = this.knex
            .select('tag.id as tag_id','tag.name as tag_name','restaurant.id', 'restaurant.name', 'restaurant.img', 'restaurant.price','restaurant.rating')
            .from('restaurant')
            .innerJoin('restaurant_tag', 'restaurant_tag.rest_id', 'restaurant.id')
            .innerJoin('tag', 'restaurant_tag.tag_id', 'tag.id')
            .where('tag.id', tagID)
            .orderBy('tag.name');

        return query.then(rows => {
            return rows.map(row => ({
                tag_id: row.tag_id,
                tag_name: row.tag_name,
                id: row.id,
                name: row.name,
                img: row.img,
                price: row.price,
                rating: row.rating,
                tags: []
            }))
        })
        .then(rows => { // Get all other tags for each restaurant
            return Promise.all(
                rows.map(row => {
                    let query = this.knex
                    .select('tag.id','tag.name')
                    .from('tag')
                    .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
                    .where('restaurant_tag.rest_id', row.id)
                    .orderBy('tag.name')

                    return query.then(tagRows => {
                        tagRows.forEach(tagRow => {
                            row.tags.push({
                                tag_id: tagRow.id,
                                tag_name: tagRow.name
                            });
                        });
                        return row;
                    })
                })
            )
        })
    }

    // listRestByTag(tagID) {  // For generic home page content (PROTOTYPE VERSION)
    //     let query = this.knex
    //         .select('tag.name as tag_name','restaurant.id', 'restaurant.name', 'restaurant.price','restaurant.img')
    //         .from('restaurant')
    //         .innerJoin('restaurant_tag', 'restaurant_tag.rest_id', 'restaurant.id')
    //         .innerJoin('tag', 'restaurant_tag.tag_id', 'tag.id')
    //         .where('tag.id', tagID)
    //         .orderBy('tag.name');

    //     return query.then(rows => {
    //         return rows.map(row => ({
    //             tag_name: row.tag_name,
    //             id: row.id,
    //             name: row.name,
    //             price: row.price,
    //             img: row.img,
    //             tags: []
    //         }))
    //     })
    //     .then(rows => { // Get all other tags for each restaurant
    //         return Promise.all(
    //             rows.map(row => {
    //                 let query = this.knex
    //                 .select('tag.name')
    //                 .from('tag')
    //                 .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
    //                 .where('restaurant_tag.rest_id',row.id)
    //                 .orderBy('tag.name')

    //                 return query.then(tagRows => {
    //                     tagRows.forEach(tagRow => {
    //                         row.tags.push(tagRow.name);
    //                     });
    //                     return row;
    //                 })
    //             })
    //         )
    //     })
    // }


    listRestByUserFavTag (userID) { // For personalised home page content
        let query = this.knex
            .select('tag_id')
            .from('users_fav_tag')
            .innerJoin('tag','tag_id','tag.id')
            .where('users_id', userID)
            .orderBy('tag.name');

        return query.then(rows => {
            return rows.map(row => ({
                tagID: row.tag_id
            }))
            .then((tagIDrows)=> {
                tagIDrows.forEach(tagID => {
                    listRestByTag(tagID);
                })
            }) 
        })
    }

    listRestByGeo(coord) { // To be implemented
        // Get all restaurants from DB within range of specified coordinates (user's location)
        // For each restaurant, get own coordinate for pin location on map"
        // Get Restaurant.name for each restaurant
        // Get Restaurant.short_desc for each restaurant
    }

    // Restaurant details services
    getRestDetail(restID) {
        let query = this.knex
            .select(
                'restaurant.id',
                'restaurant.name',
                'restaurant.img',
                'restaurant.map',
                'restaurant.about',
                'restaurant.price',
                'restaurant.website',
                'restaurant.phone',
                'restaurant.hours',
                'restaurant.lat',
                'restaurant.lng',
                'restaurant.location'
            )
            .from('restaurant')
            .where('restaurant.id', restID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
                map: row.map,
                about: row.about,
                price: row.price,
                website: row.website,
                phone: row.phone,
                hours: row.hours,
                lat: row.lat,
                lng: row.lng,
                location: row.location,
                tags: []
            }));
        })

        .then(rows => { // Get all other tags for restaurant
            return Promise.all(
                rows.map(row => {
                    let query = this.knex
                    .select('tag.id','tag.name')
                    .from('tag')
                    .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
                    .where('restaurant_tag.rest_id', row.id)
                    .orderBy('tag.name')

                    return query.then(tagRows => {
                        tagRows.forEach(tagRow => {
                            row.tags.push({
                                tag_id: tagRow.id,
                                tag_name: tagRow.name
                            });
                        });
                        return row;
                    })
                })
            )
        })
    }

    getRestRating(restID) {
        let query = this.knex
            .select(this.knex.raw('AVG(users_review.rating)'))
            .from('users_review')
            .where('users_review.rest_id', restID)

        return query.then(rows => {
            if (rows.length === 0) {
                return 0;
            } else {
                let values = [];
                for (let i = 0;i < rows.length;i++) {
                    values.push(rows[i].rating);
                }
                let sum = values.reduce((acc,next) => {
                    return acc + next;
                });
                return sum / rows.length;
            }
        })
    }

    // Review services
    listReview(restID) {
        let query = this.knex
            .select('users.name','users_review.comment','users_review.rating','users_review.created_at')
            .from('users_review')
            .innerJoin('restaurant', 'users_review.rest_id', 'restaurant.id')
            .innerJoin('users', 'users_review.users_id', 'users.id')
            .where('rest_id',restID)
            .orderBy('users_review.created_at','desc');

        return query.then((rows) => {
            return rows.map(row => ({
                name: row.name,
                comment: row.comment,
                rating: row.rating,
                dateSubmitted: row.created_at
            }))
        })
    }

    addReview(comment,rating,userID,restID) {
        let query = this.knex
                    .select()
                    .from('users')
                    .where('users.id',userID)

        return query.then((rows) => {
            if (rows.length !== 1) {
                throw new Error('Invalid user');
            } else {
                return this.knex  
                    .insert({
                        users_id: userID,
                        rest_id: restID,
                        comment: comment,
                        rating: rating
                    })
                    .into('users_review');
            }
        })
    }
}

module.exports = RestService;