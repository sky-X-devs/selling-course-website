
const jwt = require("jsonwebtoken");
require('dotenv').config();

function userMiddleware () { 
    const token = req.headers.token;
    const decoded = jwt.verify(toekn, process.env.JWT_USER_SECRET);
    
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            Message : "You are not signed in"
        })
    }
}

module.exports = userMiddleware;