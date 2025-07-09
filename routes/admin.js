const express = require("express");
const Router = express.Router;
const jwt = require('jsonwebtoken');
const z = require('zod');
const { adminModel } = require("../db/adminModel");
const { configDotenv } = require("dotenv");
require("dotenv").config();

const adminRouter = Router;

adminRouter.post('/signup',function (req,res){
    const { firstName , lastName , email , password } = req.body;
    const admin = z.object({
        firstName : z.string(),
        lastName : z.string(),
        email : z.string().email(),
        password : z.string().min(4).max(16)
    })

    const zodCheck = admin.safeParse({firstName,lastName,email,password});

    if(zodCheck.success){
        adminModel.create({
            firstName,
            lastName,
            email,
            password
        }).then(result,()=>{
            console.log(result)
        }).catch(e,function(){
            console.log("error in crating admin model")
        })

        res.json({
           message : " signup successfully completed "
        })
    }
})

adminRouter.get("/signin",async function (req,res) {
    const { email , password } = req.body; 
    const admin = await adminModel.findOne({email}) ;
    if(!admin){
        return res.json({
            message : "Invalid credentials "
        })
    }else{
        const token = jwt.sign({email},process.env.jwt_SECRET);
        res.json({
            message:"admin login successfully "
        })
    }
})

module.exports = { 
    adminRouter:adminRouter
}