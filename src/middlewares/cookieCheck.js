const jwt = require('jsonwebtoken');

function cookieCheck(req, res, next) {
    let token = req.cookies.token;

    if(!token) {
        next();
    }
    if(token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                res.cookie('token', '', {maxAge: -1});
                next();
            } else {
                res.redirect('/');
            }
        })
    }
}

module.exports = cookieCheck;