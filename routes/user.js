const express = require('express');
const Router = express.Router;
const z = require('zod');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../db/userModel');

const userRouter = Router(); //function not a class 

    userRouter.post('/signup',async function(req,res){
        const { firstName, lastName , email , password } = req.body ;
        
        const user = z.object({
            firstName:z.string(),
            lastName:z.string(),
            email:z.string().email(),
            password:z.string().min(5,"password should atleast of 8 character").max(16)
        })
        const result = user.safeParse({firstName,lastName,email,password});
        if(result.success){
            const response = await User.create({
                firstName,
                lastName,
                email,
                password
                });
                console.log("username is ", response.firstName + response.lastName);
                return res.status(200).json({
                Message:"signup is successfully done "     
            })
        }
        return res.json({
            Message:"Invalid details "
        })

    })

    userRouter.post('/signin',async function(req,res){
        const { email , password } = req.body;

        const foundUser = await User.findOne({email,password});
        console.log('found user ', foundUser);
        if(!foundUser){
            return res.status(401).json({
                Message:"Invalid credential"
            })
        }
        const token =  jwt.sign({email},process.env.JWT_SECRET);
        
        res.status(200).json({
            Message:"Valid Credentials ",
            token
        })
    })
userRouter.get('/purchases',()=>{


})
    

module.exports = { 
    userRouter:userRouter
}