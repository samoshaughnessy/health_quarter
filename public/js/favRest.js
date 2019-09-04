$(() => {
    $.get(`/api/fav/restaurants`).then(data => { // Get list of all fav restaurants
        data.forEach(e => {
            $('#fav-rest-list').append(Rest(e.rest_id, e.name, e.img, e.rating, e.price));

            $.get(`/api/fav/rest/${e.rest_id}`).then(res => { // Check and return fav status
                let status = JSON.parse(res);
                if (status === true) {
                    $(`i[data-id="${e.rest_id}"]`).addClass("fa-heart");
                    $(`i[data-id="${e.rest_id}"]`).removeClass("fa-heart-o");
                } else {
                    $(`i[data-id="${e.rest_id}"]`).addClass("fa-heart-o");
                    $(`i[data-id="${e.rest_id}"]`).removeClass("fa-heart");
                }
            });
            $(`i[data-id="${e.rest_id}"]`).on('click', () => { // Listen to click to toggle favourite status
                toggleFav(e.rest_id);
            });

            // Define fav button function
            function toggleFav(restID) {
                if ($(`i[data-id="${restID}"]`).hasClass("fa-heart")) {
                    axios.delete(`/api/fav/rest/${restID}`).then(() => {
                        $(`i[data-id="${restID}"]`).removeClass("fa-heart");
                        $(`i[data-id="${restID}"]`).addClass("fa-heart-o");
                    })
                }
                if ($(`i[data-id="${restID}"]`).hasClass("fa-heart-o")) {
                    axios.post(`/api/fav/rest/${restID}`).then(() => {
                        $(`i[data-id="${restID}"]`).removeClass("fa-heart-o");
                        $(`i[data-id="${restID}"]`).addClass("fa-heart");
                    })
                }
            }

            // Calculate average rating and show as stars
            $.get(`/api/rest/rating/${e.rest_id}`).then(res => {
                for (let i = 0;i < res;i++) {
                    $(`#rating_${e.rest_id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                }
                for (let i = 0;i < (5-res);i++) {
                    $(`#rating_${e.rest_id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                }
            });
        });
    });
    const Rest = (id, name, img, rating, price) => {
        return `
                <div class="innerwrapper">
                    <div class="name"><a href="/rest/${id}">${name}</a>
                    </div>
                    <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i>
                    </div>
                    <div class="image">
                        <a href="/rest/${id}"><img src="${img}"></a>
                    </div>
                    <div class="price">${price}</div>
                    <div class="stars" id="rating__${id}"></div>
                    <div class="viewmore"><a href="/rest/${id}">view more</a></div>
                </div>
            `
    };
})



