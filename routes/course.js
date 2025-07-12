const { Router } = require('express');
const z = require('zod');
const userMiddleware = require('../middleware/userMiddleware');
const { purchaseModel } = require('../db/purchaseModel');
const { courseModel } = require('../db/courseModel');
const courseRouter = Router();

const purchaseZod = z.object({
    creatorId : z.strict(),
});

courseRouter.post('/purchase/:courseId',userMiddleware, async (req, res) => {
    const { courseId } = req.params; 
    const userId  = req.id; 
    // const { creatorId } = req.body;
    
    const result = purchaseZod.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            error : result.error.errors
        });
    }
    const { creatorId } = result.data;

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
            userId,
            creatorId
        })
        return res.status(200).json({
            Message : "Purchase successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            error : "Error while purchasing "
        })
    }

})

courseRouter.get('/preview', userMiddleware, async () => {
    const { courseId } = req.params;
    
})

module.exports = {
    courseRouter: courseRouter
}