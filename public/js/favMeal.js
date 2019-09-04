$(() => {
    $.get(`/api/fav/meals`).then(data => { // Get list of all fav meals
        data.forEach(e => {
            $('#fav-meal-list').append(Meal(e.name, e.img, e.id, e.rest_id));

            $.get(`/api/fav/meal/${e.id}`).then(res => { // Check and return fav status
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
        });
    });
    const Meal = (name, img, id, rest_id) => {
        return `
            <div class="mealplanwrapper">
            <div class="name"><a href="/meal/${id}">${name}</a>
            </div>
            <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i>
            </div>
            <div class="image">
                <img src="${img}">
            </div>
            <div class="link"><a href="/rest/${rest_id}">view more</a></div>
            `
    };
})

// Define fav button function
function toggleFav(mealID) {
    if ($(`i[data-id="${mealID}"]`).hasClass("fa-heart")) {
        axios.delete(`/api/fav/meal/${mealID}`).then(() => {
            $(`i[data-id="${mealID}"]`).removeClass("fa-heart");
            $(`i[data-id="${mealID}"]`).addClass("fa-heart-o");
        })
    }
    if ($(`i[data-id="${mealID}"]`).hasClass("fa-heart-o")) {
        axios.post(`/api/fav/meal/${mealID}`).then(() => {
            $(`i[data-id="${mealID}"]`).removeClass("fa-heart-o");
            $(`i[data-id="${mealID}"]`).addClass("fa-heart");
        })
    }
}





