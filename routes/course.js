const { Router } = require('express');

const courseRouter = Router();

courseRouter.post('/signup',function(req,res){
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




module.exports = {
    courseRouter:courseRouter
}