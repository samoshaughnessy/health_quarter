const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const flash = require('connect-flash');
const morgan = require('morgan');

module.exports = (knex, redisClient) => {
    let app = express();
    app.engine('handlebars', hb({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.use(express.static('public'));
    app.use(flash());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    require('./init-sessions')(app, redisClient);
    require('./init-passport')(app, knex);

    return {
        app: app
    }
}