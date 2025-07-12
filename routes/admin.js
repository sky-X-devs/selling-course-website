const express = require("express");
const Router = express.Router;
const jwt = require('jsonwebtoken');
const z = require('zod');
const { adminModel } = require("../db/adminModel");
const { courseModel } = require("../db/courseModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 10;
const adminRouter = Router();
const adminMiddleware = require("../middleware/adminMiddleware");


adminRouter.post('/signup',async function (req,res){
    const { firstName , lastName , email , password } = req.body;
    const admin = z.object({
        firstName : z.string(),
        lastName : z.string(),
        email : z.string().email(),
        password : z.string().min(4).max(16)
    })

    const zodCheck = admin.safeParse({firstName,lastName,email,password});

    if(zodCheck.success){

        const hashPassword = await bcrypt.hash(password,saltRound);
        await adminModel.create({
            firstName,
            lastName,
            email,
            password : hashPassword
        });

        return res.json({
           message : " signup successfully completed "
        })
    }
    return res.json({
        message : "invalid credential"
    })
})

adminRouter.post("/signin",async function (req,res) {
    const { email , password } = req.body; 
    const admin = await adminModel.findOne({email}) ;
    if(!admin){
        return res.json({
            message : "Invalid credentials "
        })
    }

    const token = jwt.sign({email},process.env.JWT_ADMIN_SECRET);
    res.json({
        message:"admin login successfully ",
        token
    })
    
})

adminRouter.post("/course",adminMiddleware, async function (req, res){
    const adminId = req.userId;
    
    const {title, description, price, imageUrl } = req.body; 
    const cousre = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    });

    console.log("course is created with this specification => "+cousre);

    res.json({
    message : "course created",
    courseId : cousre._id
});

})

adminRouter.put("/course",adminMiddleware, async function (req, res) {
    const { newtitle, newdescription , newprice , newimageUrl,courseId } = req.body;
    //  const cousre = courseModel.findOne({
    //     coureId
    //  })
    const res = await courseModel.updateOne({
        courseid : adminId
    },{
     title : newtitle , 
            description : newdescription , 
            price : newprice ,
            imageUrl : newimageUrl
        }
    )
    res.json({
        Message : "course updated "
    })     
    
})

adminRouter.get("/course/bulk",async function ( req, res ){

    const course = await courseModel.find();
    res.json({
        course
    })
})

module.exports = { 
    adminRouter:adminRouter
}