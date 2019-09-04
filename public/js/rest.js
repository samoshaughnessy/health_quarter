$(() => {
    let restID = window.location.href.split("/").pop(); // Get restaurant ID from URL

    // Get restaurant details
    $.get(`/api/rest/detail/${restID}`).then(data => {
        data.forEach(e => {
            e.tags.forEach(tag => { // Insert tags
                $('#tag-container').append(`<span class="tag"><a href="/tag/${tag.tag_id}">${tag.tag_name}</a></span>`)
            })

            $('#heroImg').css('background-image',`url("../${e.img}")`) // Insert hero image

            $('#restName').text(`${e.name}`); // Insert name

            $('#rest-detail').append(RestDetail( // Insert details
                e.about,
                e.price,
                e.phone,
                e.hours,
                e.location,
                e.map
            ))

            // Get favourite status 
            $.get(`/api/fav/rest/${restID}`).then(res => {
                let status = JSON.parse(res);
                if (status === true) {
                    $('#favBtn i').addClass("fa-heart").removeClass("fa-heart-o");
                    $('#favBtn span').html('Remove from favourites');
                } else {
                    $('#favBtn i').addClass("fa-heart-o").removeClass("fa-heart");
                    $('#favBtn span').html('Add to favourites');
                }
            })

            // Listen to click to toggle favourite status
            $('#favBtn').on('click', () => {
                toggleFav(restID);
            })

        })
    });

    const RestDetail = (about, price, phone, hours, location, map) => {
        return `
            <h2 class="sub-heading">ABOUT</h2>
            <p id="about">${about}</p>
            <h2 class="sub-heading">PRICE RANGE</h2>
            <p id="price">${price}</p>
            <h2 class="sub-heading">PHONE</h2>
            <p id="phone">${phone}</p>
            <h2 class="sub-heading">OPENING HOURS</h2>
            <p id="hours">${hours}</p>
            <h2 class="sub-heading">ADDRESS</h2>
            <p id="address">${location}</p>
            <div id="map">${map}</div>
            `
    }

    // Get all dishes of current restaurant
    $.get(`/api/dish/rest/${restID}`).then(data => {
        data.forEach(e => {
            $('#dish-detail').append(DishDetail(
                e.id,
                e.name,
                e.img,
            ))
            $.get(`/api/fav/dish/${e.id}`).then(res => { // Check and return fav status
                let status = JSON.parse(res);
                if (status === true) {
                    $(`i[data-id="${e.id}"]`).addClass("fa-heart");
                    $(`i[data-id="${e.id}"]`).removeClass("fa-heart-o");
                } else {
                    $(`i[data-id="${e.id}"]`).addClass("fa-heart-o");
                    $(`i[data-id="${e.id}"]`).removeClass("fa-heart");
                }
            });
            $(`i[data-id="${e.id}"]`).on('click', () => { // Listen to click to toggle favourite status
                toggleFav(e.id);
            });

            // Define fav button function
            function toggleFav(dishID) {
                if ($(`i[data-id="${dishID}"]`).hasClass("fa-heart")) {
                    axios.delete(`/api/fav/dish/${dishID}`).then(() => {
                        $(`i[data-id="${dishID}"]`).removeClass("fa-heart");
                        $(`i[data-id="${dishID}"]`).addClass("fa-heart-o");
                    })
                }
                if ($(`i[data-id="${dishID}"]`).hasClass("fa-heart-o")) {
                    axios.post(`/api/fav/dish/${dishID}`).then(() => {
                        $(`i[data-id="${dishID}"]`).removeClass("fa-heart-o");
                        $(`i[data-id="${dishID}"]`).addClass("fa-heart");
                    })
                }
            }
        });
    });
    
    const DishDetail = (id, name, img) => {
        return `
            <div class="col-sm-12 col-md-6 col-lg-4 dish-container">
                <div class="dish-info-container">
                    <h6 id="dishName">${name}</h6>
                    <i data-id="${id}" id="favDishBtn" class="fa fa-heart" aria-hidden="true"></i>
                </div>
                <img class="dish-img" src="${img}" alt="">
            </div>
            `
    }

    // Get all meal plans of current restaurant
    $.get(`/api/meal/${restID}`).then(data => {
        data.forEach(e => {
            $('#meal-detail').append(MealDetail(
                e.id,
                e.name,
                e.img
            ))
        });
    });
    const MealDetail = (id, name, img) => {
        return `
            <div class="col-4 meal-container">
                <div class="meal-info-container">
                    <h6 id="mealName">${name}</h6>
                    <i data-id="${id}" class="fa fa-heart" aria-hidden="true"></i>
                </div>
                <img class="meal-img" src="${img}" alt="">
            </div>
        `
    }

    // Get users' reviews
    $.get(`/api/rest/review/${restID}`).then(data => {
        data.forEach(e => {
            $('#rest-review').append(UsersReview(
                e.review_id,
                e.name,
                e.comment,
                e.dateSubmitted.split('T',1)
            ))

            // Render rating into stars
            for (let i = 1;i <= e.rating;i++) {
                $(`#rating_${e.review_id}`).append(`<i class="fa fa-star" aria-hidden="true"></i>\n`);
            }
            for (let i = (e.rating + 1);i <= 5;i++) {
                $(`#rating_${e.review_id}`).append(`<i class="fa fa-star-o" aria-hidden="true"></i>\n`);
            }
        });
    });
    const UsersReview = (review_id, name, comment, dateSubmitted) => {
        return `
            <div class="user-review">
                <div class="d-flex justify-content-flex-start">
                    <div class="user-rating" id="rating_${review_id}"></div>
                    <span class="date">${dateSubmitted}</span>
                </div>
                <div class="col-8 user-comment">
                    <p>${escape(comment)}</p>
                </div>
                <div class="user-info d-flex justify-content-flex-start align-items-center">
                    <img class="avatar" src="../images/users/khc.png" alt="">
                    <p id="user-name">${escape(name)}</p>
                </div>
            </div>
            `
    }

    // Post user review
    $('#submitReview').on('click', (e) => {
        e.preventDefault();

        let comment = $('#comment').val();
        let rating = $('input[name=rating]:checked').val()

        if (comment === '') {
            return;
        }

        axios.post(`/api/rest/review/${restID}`, {
            "comment": comment,
            "rating": rating
        })
            .then((res) => {
                document.location = `/rest/${restID}`;
            })
    })
})

// Define fav button function
function toggleFav(restID) {
    if ($('#favBtn span').text() === "Remove from favourites") {
        axios.delete(`/api/fav/rest/${restID}`).then(() => {
            $('#favBtn i').addClass("fa-heart-o").removeClass("fa-heart");
            $('#favBtn span').text("Add to favourites");  
        })
    }
    if ($('#favBtn span').text() === "Add to favourites") {
        axios.post(`/api/fav/rest/${restID}`).then(() => {
            $('#favBtn i').addClass("fa-heart").removeClass("fa-heart-o");
            $('#favBtn span').text("Remove from favourites");
        })
    }
}

