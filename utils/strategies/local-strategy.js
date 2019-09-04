const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('../bcrypt.js');


module.exports = (app, knex) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-signup', new LocalStrategy(
        {passReqToCallback : true},
        async (req, email, password, done) => {
            try{
                let users = await knex('users').where({email:email});
                if (users.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }
                let hash = await bcrypt.hashPassword(password)
                const newUser = {
                    email:email,
                    password:hash,
                    name:req.body.nickname,
                    img:`/images/users/${req.file.originalname}`
                };
                console.log(req.body);
                let userId = await knex('users').insert(newUser).returning('id');
                newUser.id = userId;

                for(let i = 0; i < req.body.tag.length; i++) {
                    let favTagId = await knex("users_fav_tag").insert({users_id:`${newUser.id}`,tag_id:req.body.tag[i]}).returning('tag_id');
                }

                if (user.length !== 0) {
                    var payload = {
                        id: userId[0].id
                    };
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                        token: token
                    });
                } else {
                    res.sendStatus(401);
                }

                done(null,newUser);
            }catch(err){
                done(err);
            }
        })
    );

    passport.use('local-login', new LocalStrategy(
        async (email, password, done) => {
            try{
                let users = await knex('users').where({email:email})
                if(users.length == 0){
                    return done(null, false, { message: 'Incorrect credentials' });
                }
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password);
                if(result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect credentials'});
                }
            }catch(err){
                done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let users = await knex('users').where({id:Number(id)});
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
};