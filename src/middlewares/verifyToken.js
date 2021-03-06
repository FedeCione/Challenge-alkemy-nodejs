const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.cookies.token;

    if(!token) {
        res.redirect('/auth/login');
    }
    if(token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                res.cookie('token', '', {maxAge: -1});
                res.redirect('/auth/login');
            } else {
                res.locals.token = token;
                next();
            }
        })
    }
}

module.exports = verifyToken;