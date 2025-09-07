
const jwt = require("jsonwebtoken");
require('dotenv').config();

function userMiddleware (req,res,next) { 
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({
            Message : "Yo must login first"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        console.log("Decoded token:", decoded);
        if(decoded){
            req.userId = decoded.userId;
            console.log("User ID from token:", req.headers.userId); 
            next();
        }else{
        res.status(403).json({
            Message : "You are not signed in"
        })
    }
    }
    catch(err){
        console.error("Error in userMiddleware ", err);
        return res.status(500).json({
            Message : "Internal Server Error "
        })
    }
    
}

module.exports = userMiddleware;