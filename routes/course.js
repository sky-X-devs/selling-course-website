const { Router } = require('express');
const z = require('zod');
const userMiddleware = require('../middleware/userMiddleware');
const { purchaseModel } = require('../db/purchaseModel');
const courseRouter = Router();


courseRouter.post('/purchase/:courseId',userMiddleware, async (req, res) => {
    const { courseId } = req.params; 
    const { userId }  = req.id; 
    // const { creatorId } = req.body;
    
    try {
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

courseRouter.get('/preview/:courseId', userMiddleware, async () => {
    const { courseId } = req.params;
    
})




module.exports = {
    courseRouter: courseRouter
}