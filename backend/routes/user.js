const express = require('express');
const Router = express.Router;
const z = require('zod');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../db/userModel');
const bcrypt = require("bcrypt");
const userMiddleware = require('../middleware/userMiddleware');
const { purchaseModel } = require('../db/purchaseModel');
const { courseModel } = require('../db/courseModel');
const saltRounds = 10;


const userRouter = Router(); //function not a class 

userRouter.post('/signup', async function (req, res) {
    const { firstName, lastName, email, password } = req.body;
    console.log("Request body ", req.body);
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            Message: "All fields are required"
        })
    }
    const user = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(5, "password should atleast of 8 character").max(16)
    })

    const result = user.safeParse({ firstName, lastName, email, password });

    if (!result.success) {
        return res.json({
            Message: "Invalid details "
        })
    }

    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const response = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        console.log("username is ", response.firstName + response.lastName, "password ", response.password);
        return res.status(200).json({
            Message: "signup is successfully done "
        });
    } catch (err) {
        console.error("Error in signup ", err);
        return res.status(500).json({
            Message: "Internal server error"
        })
    }
});

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
        return res.status(401).json({
            Message: "Invalid credential"
        })
    }
    try {
        const result = await bcrypt.compare(password, userFound.password);
        console.log("result is ", result);
        if (!result) {
            return res.json({
                Message: "User not found "
            })
        }
        const token = jwt.sign({
            id: User._id
        }, process.env.JWT_USER_SECRET);

        res.status(200).json({
            Message: "Valid Credentials ",
            token
        })
    } catch (err) {
        console.error("Error in signin ", err)
        return res.status(500).json({
            Message: "Internal Server Error "
        })
    }
})
userRouter.get('/purchases', userMiddleware, async (req, res ) => {
    const userId = req.userId;
    try { 
        const purchaseCo = await purchaseModel.find({
            userId
        })
        if(purchaseCo.length === 0){
            return res.status(404).json({
                message: "no purchases found"
            })
        }
        const courseIds = purchaseCo.map(p => p.courseIds)
        const purchased = await courseModel.find({
            _id : { $in: courseIds }
        })
        
        return res.status(200).json({
            Message : "course fetched successfully",
            purchased
        })
    }catch(error){
         console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        }); 

    }
})

module.exports = {
    userRouter: userRouter
}