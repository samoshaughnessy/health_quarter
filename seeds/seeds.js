const restaurantData = require('../database_data/restaurant_data');
const usersData = require('../database_data/users_data');
const dishData = require('../database_data/dish_data');
const mealPlanData = require('../database_data/meal_plan_data');
const tagData = require('../database_data/tag_data');
const restaurantTagData = require('../database_data/restaurant_tag_data');
const usersFavRestaurantData = require('../database_data/users_fav_restaurant_data');
const usersFavDishData = require('../database_data/users_fav_dish_data');
const usersFavMealPlanData = require('../database_data/users_fav_meal_plan_data');
const usersFavRecipeData = require('../database_data/users_fav_recipe_data');
const usersFavTag = require('../database_data/users_fav_tag_data');
const usersReview = require('../database_data/users_review_data');

exports.seed = function(knex, Promise) {
//del all first 
  return knex('restaurant').del()
  .then(()=> knex('users').del())
  .then(()=> knex('dish').del())
  .then(()=> knex('meal_plan').del())
  .then(()=> knex('tag').del())
  .then(()=> knex('restaurant_tag').del())
  .then(()=> knex('users_fav_restaurant').del())
  .then(()=> knex('users_fav_dish').del())
  .then(()=> knex('users_fav_meal_plan').del())
  .then(()=> knex('users_fav_recipe').del())
  .then(()=> knex('users_fav_tag').del())
  .then(()=> knex('users_review').del())
  .then(()=> knex('restaurant').insert(restaurantData))
  .then(()=> knex('users').insert(usersData))
  .then(()=> knex('dish').insert(dishData))
  .then(()=> knex('meal_plan').insert(mealPlanData))
  .then(()=> knex('tag').insert(tagData))
  .then(()=> knex('restaurant_tag').insert(restaurantTagData))
  .then(()=> knex('users_fav_restaurant').insert(usersFavRestaurantData))
  .then(()=> knex('users_fav_dish').insert(usersFavDishData))
  .then(()=> knex('users_fav_meal_plan').insert(usersFavMealPlanData))
  .then(()=> knex('users_fav_recipe').insert(usersFavRecipeData))
  .then(()=> knex('users_fav_tag').insert(usersFavTag))
  .then(()=> knex('users_review').insert(usersReview))

};
