const { User } = require("../models/User");
const cookieParser = require('cookie-parser');

let auth = (req, res, next) => {
    // Where we process the authentification logic.
    // 1. Get the token from Client Cookie.
    let token = req.cookies.x_auth

    // 2. Decode the token, and find the user.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        // 3. If the user doesn't exist, auth decline.
        if(!user) return res.json({isAuth : false, error : true});

        // 4. If the user exists, auth success!
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth}