const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {  
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: "The e-email is not exist." })
                }
                if (user.password !== password) {           //  可用其他方式驗證密碼  
                    return done(null, false, { message: "Password or Email incorrect" })
                }
                return done(null, user)   //  伺服器端session會存取使用者資料
            })

            .catch(err => done(err, false))
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => { done(err, user) })
            .lean()
            // .then(user => done(null, user))
            // .catch(err => done(err, false))

    });
}