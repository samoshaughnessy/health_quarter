require('dotenv').config(); // Define environments

const fs = require('fs');
const https = require('https');

const NODE_ENV = process.env.NODE_ENV || 'development';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379

const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

const redis = require('redis'); // Connect to Redis server
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});

const {app} = require('./utils/init-app')(knex, redisClient);

const ViewRouter = require('./ViewRouter');

const { DishRouter,
    FavRouter,
    MealRouter,
    RestRouter,
    UserRouter,
     } = require('./routers');

const { DishService,
    FavService,
    MealService,
    RestService,
    UserService } = require('./services');

    
let dishService = new DishService(knex);
let favService = new FavService(knex); 
let mealService = new MealService(knex);
let restService = new RestService(knex); 
let userService = new UserService(knex);

app.use('/api/dish', (new DishRouter(dishService)).router());
app.use('/api/fav', (new FavRouter(favService, redisClient)).router());
app.use('/api/meal', (new MealRouter(mealService)).router());
app.use('/api/rest', (new RestRouter(restService, redisClient)).router());
app.use('/api/user', (new UserRouter(userService, redisClient)).router());

const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
};

app.use('/', new ViewRouter().router());

https.createServer(httpsOptions, app).listen(8080, ()=>{
    console.log('Application listening to port 8080')
});