$(() => {
    // Get profile details
    $.get(`/api/user/details`).then(data => {
        data.forEach(e => {
            $('#my-detail').append(UserDetail(
                e.img,
                e.email,
                e.name,
            ))
        });
    });
    const UserDetail = (img, email, name) => { // Append form with embedded details to page
        return `
            <div class="info-container">
                <form action="/api/user/details" method="put" enctype="multipart/form-data">
                    <div>
                        <label>AVATAR  </label>
                        <div><img src="${img}" height="100" width="100"></div>
                    </div>
                    <div>
                        <label>EMAIL</label>
                        <div><input type="text" name="username" value="${email}" readonly/></div>
                    </div>
                    <div>
                        <label>NICKNAME</label>
                        <div>
                            <input type="text" name="nickname" id="nickname" value="${name}"/>
                        </div>
                    </div>
                </form> 
            </div>`
    }

    // <div class="d-flex justify-content">
    // <label>Upload new image</label>
    // <input type="file" id="avatar" accept="image/*" name="avatar">
    // </div>
    // <div>
    //     <button id="updateImg">Upload</button>
    // </div>

    $.get('/api/user/tags/all').then(data => { // Get all available tags as checkboxes
        data.forEach(e => {
            $('#tag-list').append(Tags(
                e.id,
                e.name
            ))
        });

        // Hide default tags
        $('#tag_1').parent().css('display','none');
        $('#tag_2').parent().css('display','none');
        $('#tag_15').parent().css('display','none');
        $('#tag_16').parent().css('display','none');
    });
    const Tags = (id, name) => {
        return `
            <div class="info-container">
                <input type="checkbox" name="tag" id="tag_${id}" value="${id}">  ${name}
            </div>`
    }

    $.get(`/api/user/tags/fav`).then(data => { // Get all fav tags (already checked)
        return data.forEach(e => {
            return $(`#tag_${e.id}`).prop('checked', true);
        });
    })

    // Update account details
    $('#updateBtn').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/user/details', {
            "nickname": $('#nickname').val(), // Update nickname only
        })
            .then(() => {
                axios.delete('/api/user/tags/fav') // Clear all fav tags
                .then(()=> {
                    var checked = $('input:checked');
                    for (i = 0;i < checked.length;i++) {
                        axios.put('/api/user/tags/fav',{ // Insert new fav tags
                            tag: {
                                tag_id: checked[i].defaultValue
                            }
                        });
                    }
                })
            })
            .then(()=>location.reload())
            .catch(err => console.log(err));
    })

    // Update avatar image (post new)
    $('#tag-list').on('click','#updateImg', (e) => {

        e.preventDefault();

        let file = $('#avatar').get(0).files;
        var formData = new FormData();
        formData.append("avatar", file);
        console.log(formData);
        axios.post(`/api/user/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(()=> {
            axios.put('/api/user', {
                "img": `/images/users/${file[0].name}` // Insert image URL to DB
            }) 
        })
        .then(()=>location.reload())
    })

    // Get all reviews submitted by current user
    $.get(`/api/user/review`).then(data => {
        data.forEach(e => {
            $('#review-list').append(ReviewDetail(
                e.rest_name,
                e.id,
                e.comment
            ));

            $(`#${e.id}_${e.rating}`).attr('selected','selected');
            
            // // Render rating into stars
            // for (let i = 1;i <= e.rating;i++) {
            //     $(`#rating_${e.id}`).append(`<i class="fa fa-star" aria-hidden="true" id="${i}_star" data-id="${i}"></i>`);
            // }
            // for (let i = (e.rating + 1);i <= 5;i++) {
            //     $(`#rating_${e.id}`).append(`<i class="fa fa-star-o" aria-hidden="true" id="${i}_star" data-id="${i}"></i>`);
            // }
        });
    });

    const ReviewDetail = (rest_name, id, comment) => {
        return `
            <div id="reviewContainer">
                <form action="/api/user/review/${id}" method="put">
                    <h5 value="${id}">${rest_name}</h5>
                    <div class="d-flex justify-content">
                        <label>Your comment:</label>
                        <textarea type="text" name="comment" id="comment">${comment}</textarea>
                    </div>
                    <div class="d-flex justify-content">
                        <label>Rating:  </label>
                        <select>
                            <option value="1" id="${id}_1">1</option>
                            <option value="2" id="${id}_2">2</option>
                            <option value="3" id="${id}_3">3</option>
                            <option value="4" id="${id}_4">4</option>
                            <option value="5" id="${id}_5">5</option selected="selected">
                        </select>
                        </div>
                        <div>
                        <input type="submit" id="updateReview" value="Update" data-id="${id}" />
                        <input type="submit" id="deleteReview" value="Delete" data-id="${id}" />
                    </div>
                    </div>
                </form>
            </div>
        `
    }
    

    // $(`#review-list`).on('click',`#1_star`,(e)=> {
    //     if ($(e.currentTarget).hasClass("fa-star")) {
    //         $(e.currentTarget).addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //     } else {
    //         $(e.currentTarget).addClass("fa-star").removeClass("fa-star-o");
    //         $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star")
    //         $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //         $(e.currentTarget).parent().data($(e.currentTarget).data());
    //     }
    // })

    // $(`#review-list`).on('click',`#2_star`,(e)=> {
    //     $(e.currentTarget).prev().prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star")
    //     $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).parent().data($(e.currentTarget).data());
    // })

    // $(`#review-list`).on('click',`#3_star`,(e)=> {
    //     $(e.currentTarget).prev().prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star")
    //     $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).parent().data($(e.currentTarget).data());
    // })

    // $(`#review-list`).on('click',`#4_star`,(e)=> {
    //     $(e.currentTarget).prev().prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star")
    //     $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).parent().data($(e.currentTarget).data());
    // })

    // $(`#review-list`).on('click',`#5_star`,(e)=> {
    //     $(e.currentTarget).prev().prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).prev().addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).addClass("fa-star").removeClass("fa-star-o");
    //     $(e.currentTarget).next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).next().next().next().addClass("fa-star-o").removeClass("fa-star")
    //     $(e.currentTarget).next().next().next().next().addClass("fa-star-o").removeClass("fa-star");
    //     $(e.currentTarget).parent().data($(e.currentTarget).data());
    // })

    // Update review on button click
    $('#review-list').on('click','#updateReview',(e) => {
        e.preventDefault();
        
        let reviewID = $(e.currentTarget).data();
        axios.put(`/api/user/review/${reviewID.id}`, {
            "comment": $(e.currentTarget).parent().prev().prev().children().next().val(),
            "rating": $(e.currentTarget).parent().prev().children().next().val()
        })
        .then(()=>location.reload())
    })

    // Delete review on button click
    $('#review-list').on('click','#deleteReview',(e) => {
        e.preventDefault();
        
        let reviewID = $(e.currentTarget).data();
        axios.delete(`/api/user/review/${reviewID.id}`)
        .then(()=>location.reload())
    })

})

// Define rating function
function updateRating() {

}

