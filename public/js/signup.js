$(()=>{
    $.get('/api/user/tags/all').then(data =>{ // List all available tags
        data.forEach(e =>{
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
    const Tags = (id,name)=>{ // Display as checkboxes
        return `
            <div class="info-container tag-option">
                <input type="checkbox" class="tag-option" name="tag" id="tag_${id}" value="${id}">   ${name} </div>`
    }
})

