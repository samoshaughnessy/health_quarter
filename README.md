# Health Quarter - Healthy Dining Directory Platform

Health Quarter is an all-in-one healthy dining directory platform, showcasing Hong Kong's most popular healthy restaurants, delivery options and easy healthy recipes.

## Making this project run

Clone this repository, run npm install, this will install the require dependencies.

Start PostgreSQL (storing information) and Redis (storing session).
Create a .env file, populate with this data, DB_NAME (database name), DB_USERNAME (database username), DB_PASSWORD (database password), NODE_ENV (node.js environment), XKEY (Spoonacular API key for the recipe finder portion of the application).

Ensure that you create the database that you associate with this project (within the .env), now run the knex migration files and seed files.

Run the application. 

Goto https://localhost:8080 to see the application. 


## Design approach 
- This platform adapts a clean, simplicity and fresh design to create an image of healthy and green dining style. 

## Key Features

1. **Customized restuarant list**
    * Customized your favourite lists of restaurant, meal plans and recipes according to users' diet preference. 
2. **User Reviews**
    * Users can leave raitng and comments for specific restaurant and make contribution to the overall rating. 
3. **Searching restaurant by Tags**
    * Provide an easy directory for users to look for the most ideal healthy restaurant and meal plans.

4. **Searching recipes by calorie goal,tags and ingredients**
    * Allow users to look for the perfect recipe that fits their needs by calorie, tag and favorite ingredients.

## Built with
- HTML
- CSS
- JavaScript
- Node.js

## Frameworks and Libraries
- Bcrypt
- Express
- Knex 
- Multer
- Passport
- JQuery 3.3.1 (JavaScript library)

## API References
- Google Maps API for details regarding how to show the exact location of the restaurants.
- Spoonacular Food and Recipe API to obtain a wide range of recipes sorted by calorie goal, tags and favorite ingredients.

## Versioning
- GIT has been used for version control

## Authors
- King Hei Chick
- Sam O'Shaughnessy
- Sonya Wong
- Wesley Yung