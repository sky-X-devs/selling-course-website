const { Router } = require('express');
const z = require('zod');
const userMiddleware = require('../middleware/userMiddleware');
const { purchaseModel } = require('../db/purchaseModel');
const { courseModel } = require('../db/courseModel');
const courseRouter = Router();

// const purchaseZod = z.object({
//     creatorId : z.string()
// });

courseRouter.post('/purchase/:courseId',userMiddleware, async (req, res) => {
    const { courseId } = req.params; 
    const userId  = req.userId; 
    // const { creatorId } = req.body;
    // console.log("courseId:", typeof(courseId ) );
    console.log("purchase request body hit");
    // const result = purchaseZod.safeParse(req.body);
    // console.log("Zod validation result:", result);
    // if(!result.success) {
    //     return res.status(400).json({
    //         error : result.error.errors
    //     });
    // }
    // const { creatorId } = result.data;

    try {
        const course = await courseModel.findById(courseId);
        if(!course) {
            return res.status(400).json({error : "Course not found "});
        }
        const existing = await purchaseModel.findOne({courseId , userId});
        if(existing) { 
            return res.status(409).json({
                error : "Already purchased "
            })
        }
        const purchaseCourse = await purchaseModel.create({
            courseId,
            userId
        })
        return res.status(200).json({
            Message : "Purchase successfully"
        })
    }catch(error){
        console.error("Error while purchasing:", error);
        return res.status(400).json({
            error : "Error while purchasing "
        })
    }

})

courseRouter.get('/preview',  async (req,res) => {
    const co = await courseModel.find();
    if (!co) {
        return res.status(404).json({ error: "No courses found" });
    }
    console.log("Fetching courses...");

    console.log(co);
    res.json({
        co
    })
})  

module.exports = {
    courseRouter: courseRouter
}