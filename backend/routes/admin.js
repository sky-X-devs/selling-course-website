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

const courseZod = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string()
});

adminRouter.post('/signup', async function (req, res) {
    const { firstName, lastName, email, password } = req.body;
    const admin = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(4).max(16)
    })

    const zodCheck = admin.safeParse({ firstName, lastName, email, password });

    if (zodCheck.success) {

        const hashPassword = await bcrypt.hash(password, saltRound);
        await adminModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        return res.json({
            message: " signup successfully completed "
        })
    }
    return res.json({
        message: "invalid credential"
    })
})

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) {
        return res.json({
            message: "Invalid credentials "
        })
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET);
    res.json({
        message: "admin login successfully ",
        token
    })

})
//random channges 
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    console.log("adminId=> " + adminId);

    const result = courseZod.safeParse(req.body);

    console.log("result is ", result);

    if (!result.success) {
        return res.status(400).json({
            error: result.error.errors
        });
    }

    const { title, description, price, imageUrl } = result.data;

    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    });
});


adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const { newtitle, newdescription, newprice, newimageUrl } = req.body;
    const newDetail = courseZod.safeParse({newtitle, newdescription , newprice , newimageUrl });
     
    if ( !newDetail.success ){
        res.status(400).json({
            Error : newDetail.error.errors
        })
    }
    
    const adminId = req.adminId;
    console.log("adminIdz=> " + adminId);

    const result = await courseModel.updateOne({
        creatorId: adminId
    }, {
        title: newtitle,
        description: newdescription,
        price: newprice,
        imageUrl: newimageUrl
    }
    )
    console.log("after updateOne running ");
    console.log(result);
    res.json({
        Message: "course updated ",
        result
    })

})

adminRouter.get("/course/bulk", async function (req, res) {

    const course = await courseModel.find();
    res.json({
        course
    })
})

module.exports = {
    adminRouter: adminRouter
}