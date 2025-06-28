const express = require('express');
const Router = express.Router;
const z = require('zod');

const userRouter = Router(); //function not a class 
    userRouter.post('/signup',function(req,res){
        const { username , email , password } = req.body ;
        const user = z.object({
            username:z.string(),
            email:z.string().email(),
            password:z.string().min(5,"password should atleast of 8 character").max(16)
        })

        const result = user.safeParse({username,email,password});
        if(result.success){
            userArray.push({username,email,password});
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
        const foundIndex = userArray.findIndex({username,password});
        if(!foundIndex){
            return res.status(401).json({
                Message:"Invalid credential"
            })
        }
        res.status(200).json({
            Message:"Valid Credentials "
        })
    })

module.exports = { 
    userRouter:userRouter
}