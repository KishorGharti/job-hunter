import express from 'express'
import { registerValidator } from '../middlewares/auth.validator.js';
import { registerController } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { loginController } from '../controllers/login.controllers.js';
import { addJob, deleteJob, getJob, updateJob } from '../controllers/job.controllers.js';
import { adminMiddleware } from '../middlewares/admin.middlewares.js';



const router = express();

router.post('/register',registerValidator,registerController);
router.post('/login',loginController)
router.post('/addjob',authMiddleware,adminMiddleware,addJob)
router.get('/getjob',authMiddleware,getJob)
router.put('/:jobsId',authMiddleware,adminMiddleware,updateJob)
router.delete('/:jobsId',authMiddleware,adminMiddleware,deleteJob)



export default router;