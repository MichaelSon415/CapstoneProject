const jwt = require("jsonwebtoken");
const config = require("../config/auth_config.js");
//const userModel = require("../src/user/userModel.js");
//var session = require('express-session');
/*
verifyToken = (req, res, next) => {
    console.log(req.session);
    let token = req.session.token;

    if(!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token,
               config.secret,
               (err, decoded) => {
                if(err) {
                    return res.status(401).send({
                        message: "Unauthorized",
                    });
                }
                req.userId = decoded.id;
                next();
               });
};

const authJwt = {
    verifyToken
};
module.exports = authJwt;
*/

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        jwt.verify(token, config.secret);
        next();
    }catch(error){
        res.status(401).json({message: "Auth failed"});
    }
};