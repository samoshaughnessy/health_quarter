$(()=>{
    let dishID = window.location.href.split("/").pop(); // Get dish ID from URL

    // Get Dish details
    $.get(`/api/dish/detail/${dishID}`).then(data =>{
        data.forEach(e =>{
            $('#dish-detail').append(DishDetail(
                e.name,
                e.img
            ))
        });
    });
    const DishDetail = (name,img)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${escape(name)}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
            </div>`
    }

    // Get favourite status
    $.get(`/api/fav/dish/${dishID}`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').html("isFav");
        } else {
            $('#favBtn').html("notFav");
        }
    })

    // Listen to click to toggle favourite status
    $('#favBtn').on('click',()=> {
        toggleFav(dishID);
    })

})

// Define fav button function
function toggleFav(dishID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/dish/${dishID}`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/dish/${dishID}`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}

