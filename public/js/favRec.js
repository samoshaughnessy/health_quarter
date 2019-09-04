$(() => {
    $.get(`/api/fav/recipes`).then(data => { // Get list of all fav recipes
        data.forEach(e => {
            $('#fav-rec-list').append(Recipe(e.recURL));
        });
    });
    const Recipe = (recURL) => {
        return `
                <div class="info-container">
                    <p><strong>${recURL}</strong></p>
                    <a class="learnMore" href='https://spoonacular.com/${recURL}'>View details</a></p>
                    </div>`
    };
}) 