$(()=>{
    // Get lists of restaurants tagged as Food
    $.get(`/api/rest/tag/15`).then(resData=>{
        let data = resData.slice(0,3);

        data.forEach(e =>{
            $('#1stTagList').append(FoodRest(e.id,e.name,e.img,e.price,e.rating)); // Append restaurant details

            $.get(`/api/fav/rest/${e.id}`).then(res => { // Check and return fav status
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

            // Calculate average rating and show as stars
            $.get(`/api/rest/rating/${e.id}`).then(res => {
                for (let i = 0;i < res;i++) {
                    $(`#foodRating_${e.id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                }
                for (let i = 0;i < (5-res);i++) {
                    $(`#foodRating_${e.id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                }
            });

            // Append associated tags and linkages
            e.tags.forEach(tag =>{
                $(`#rest_${e.id}`).append(RestTags(tag.tag_id,tag.tag_name));
            });

            let lastTag = $('.tags').children().last().text(); // Remove comma from last tag
            lastTag = lastTag.slice(0, -2);
            $(`#rest_${e.id}`).children().last().children().text(lastTag);
        });
    });

    const FoodRest = (id,name,img,price)=>{
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
                <div class="stars" id="foodRating_${id}"></div>
                <div class="tags" id="rest_${id}">Tags: </div>
                <div class="viewmore"><a href="/rest/${id}">view more</a></div>
            </div>
            `
    };

    const RestTags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    };

    // Get lists of restaurants tagged as Drinks
    $.get(`/api/rest/tag/16`).then(res=>{ 
        let data = res.slice(0,3);
        data.forEach(e =>{
            $('#2ndTagList').append(DrinkRest(e.id,e.name,e.img,e.price,e.rating)); // Append restaurant details

            $.get(`/api/fav/rest/${e.id}`).then(res => { // Check and return fav status
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

            // Calculate average rating and show as stars
            $.get(`/api/rest/rating/${e.id}`).then(res => {
                for (let i = 0;i < res;i++) {
                    $(`#drinkRating_${e.id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                }
                for (let i = 0;i < (5-res);i++) {
                    $(`#drinkRating_${e.id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                }
            });

            // Append associated tags and linkages
            e.tags.forEach(tag =>{
                $(`#rest_${e.id}`).append(DrinkTags(tag.tag_id,tag.tag_name));
            }) 

            let lastTag = $('.tags').children().last().text(); // Remove comma from last tag
            lastTag = lastTag.slice(0, -2);
            $(`#rest_${e.id}`).children().last().children().text(lastTag);
        });
    });

    const DrinkRest = (id,name,img,price)=>{
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
                <div class="stars" id="drinkRating_${id}"></div>
                <div class="tags" id="rest_${id}">Tags: </div>
                <div class="viewmore"><a href="/rest/${id}">view more</a></div>
            </div>
            `
    };

    const DrinkTags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    }

    // Get all meal plans
    $.get(`/api/meal`).then(res => {
        let data = res.slice(0,3);
        data.forEach(e => {
            $('#mealPlanList').append(MealPlan(
                e.id,
                e.name,
                e.img,
                e.about,
                e.rest_id
            ));

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
        });
    });
    const MealPlan = (id,name,img,rest_id)=>{
            return `
            <div class="mealplanwrapper">
                <div class="name"><a href="/rest/${id}">${name}</a>
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