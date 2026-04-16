import express from 'express'
import { registerValidator } from '../middlewares/auth.validator.js';
import { registerController } from '../controllers/auth.controllers.js';



const router = express();

router.post('/register',registerValidator,registerController);



export default router;