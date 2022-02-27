const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(!token) {
        res.status(401).send({
            error: 'Es necesario un token de autenticación'
        })
        return
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
    }
    if(token){
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                return res.json({
                    message:'El token no es valido'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

module.exports = verifyToken;