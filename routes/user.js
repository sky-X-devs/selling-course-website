const express = require('express');
const Router = express.Router;
const z = require('zod');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const userArray = [];
const userRouter = Router(); //function not a class 
    userRouter.post('/signup',function(req,res){
        const { firstName, lastName , email , password } = req.body ;
        const user = z.object({
            firstName:z.string(),
            lastName:z.string(),
            email:z.string().email(),
            password:z.string().min(5,"password should atleast of 8 character").max(16)
        })

        const result = user.safeParse({firstName,lastName,email,password});
        if(result.success){
            
            return res.status(200).json({
                Message:"signup is successfully done "
            })
        }
        return res.json({
            Message:"Invalid details "
        })

    })

    userRouter.post('/signin',function(req,res){
        const { username , password } = req.body;
        const foundIndex = userArray.findIndex(user=> user.username === username && user.password === password);
        if(!foundIndex){
            return res.status(401).json({
                Message:"Invalid credential"
            })
        }
        const token =  jwt.sign({username},process.env.JWT_SECRET);
        
        res.status(200).json({
            Message:"Valid Credentials ",
            token
        })
    })

    

module.exports = { 
    userRouter:userRouter
}