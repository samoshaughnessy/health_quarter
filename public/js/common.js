$(()=> {
    $('#logout').on('click',()=> {
        sessionStorage.clear();
    })

    if (sessionStorage.getItem('status') === 'loggedIn') {
        $('#signup').css('display', 'none');
        $('#login').css('display', 'none');
        $('#favourite').css('display', 'block');
        $('#profile').css('display', 'block');
        $('#logout').css('display', 'block');
        $('#logo').attr("href","/home");
        $('#home').attr("href","/home");
        $('#favBtn').css('display', 'inline-block');
        $('.placeholderMsg').css('display','none');
        $('#reviewForm').css('display','block');
        $('#favDishBtn').css('display','inline-block');
    }
    
    if (sessionStorage.getItem('status') === null) {
        $('#favourite').css('display', 'none');
        $('#profile').css('display', 'none');
        $('#logout').css('display', 'none');
        $('#signup').css('display', 'block');
        $('#login').css('display', 'block');
        $('#logo').attr("href","/");
        $('#home').attr("href","/");
        $('#favBtn').css('display', 'none');
        $('.placeholderMsg').css('display','block');
        $('#reviewForm').css('display','none');
        $('#favDishBtn').css('display','none');
    }
})

