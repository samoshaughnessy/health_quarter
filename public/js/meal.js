$(()=>{
    //let mealID = window.location.href.split("/").pop();

    // List all meal details
    $.get(`/api/meal/`).then(data =>{
        data.forEach(e =>{
            $('#meal-listAll').append(ListAllMeal(
                e.name,
                e.img,
                e.about
            ))

            let elem = $(`#mp${e.id}_about`); // Limit about text to 50 characters
            if(elem){
                if (elem.text().length > 10)
                        elem.text(elem.text().substr(0,50)+'...');
            }
        });
    });
    const ListAllMeal = (name,img,about)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
                <label class="lbl-info">about: </label><p>${about}</p>
            </div>`
    }

    // Get favourite status
    $.get(`/api/fav/meal/`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').html("isFav");
        } else {
            $('#favBtn').html("notFav");
        }
    })

    // Listen to click to toggle favourite status
    $('#favBtn').on('click',()=> {
        toggleFav(mealID);
    })

})

// Define fav button function
function toggleFav(mealID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/meal/`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/meal/`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}