$(()=> {
    $.get(`/api/meal`).then(data => {
        data.forEach(e => {
            $('#mealPlans').append(MealPlan(
                e.id,
                e.name,
                e.img,
                e.about,
                e.rest_id
            ))

            let elem = $(`#mp${e.id}_about`); // Limit about text to 50 characters
            if(elem){
                if (elem.text().length > 10)
                        elem.text(elem.text().substr(0,50)+'...');
            }

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
    const MealPlan = (id,name,img,about,rest_id)=>{
        /*return `
            <div class="innerwrapper">
                <div class="name">${name}</div>
                    <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></i></div>
                        <div class="image">
                            <img src="${img}">
                        </div>
                    <div class="about" id="mp${id}_about">${about}"></div>
                <div class="link"><a href="/rest/${rest_id}">View more</div>
            </div>
            `*/

            return `
            <div class="mealplanwrapper">
                <div class="name"><a href="/rest/${rest_id}">${name}</a>
                </div>
                <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i>
                </div>
                <div class="image">
                                <img src="${img}">
                </div>
             
            </div>
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