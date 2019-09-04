sessionStorage.setItem('status', 'loggedIn');

$(() => {
    $.get(`/api/fav/preference`).then(tags => { // Get all fav tags
        tags.forEach(tag => { // Insert tag as title and view all linkage
            $('#tag-list').append(` 
                <div class="title">
                    <div>
                        <span>${tag.name.toUpperCase()}</span>
                        <a href="/tag/${tag.id}">VIEW ALL</a>
                    </div>
                </div>
                <div class="wrapper" id="tag_${tag.id}_rest"></div>
            `);

            $.get(`/api/rest/tag/${tag.id}`).then(res => {
                let data = res.slice(0,3); // Get list of restaurants by each tag
                data.forEach(e => {
                    
                    $(`#tag_${e.tag_id}_rest`).append(Rest(e.tag_id, e.id, e.name, e.price, e.img, e.tags));

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
                        for (let i = 0; i < res; i++) {
                            $(`#rating_${e.tag_id}_${e.id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                        }
                        for (let i = 0; i < (5 - res); i++) {
                            $(`#rating_${e.tag_id}_${e.id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                        }
                    });

                    // Append associated tags and linkages
                    e.tags.forEach(tag => {
                        $(`#rest_${e.tag_id}_${e.id}`).append(RestTags(tag.tag_id, tag.tag_name));
                    })

                    let homelastTag = $(`#rest_${e.tag_id}_${e.id}`).children().last().text(); // Remove comma from last tag
                    console.log(homelastTag);
                    homelastTag = homelastTag.slice(0, -1);
                    $(`#rest_${e.tag_id}_${e.id}`).children().last().text(homelastTag);
                });

            });
            const Rest = (tag_id,id,name,price,img)=>{
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
                        <div class="stars" id="rating_${tag_id}_${id}"></div>
                        <div class="tags" id="rest_${tag_id}_${id}">Tags: </div>
                        <div class="viewmore"><a href="/rest/${id}">view more</a></div>
                    </div>
                `
            }
            const RestTags = (tag_id,tag_name)=>{
                return `
                    <a href="/tag/${tag_id}">${tag_name},</a>
                    `
            };
        });
    });
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