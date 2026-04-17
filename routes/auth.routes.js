import express from 'express'
import { registerValidator } from '../middlewares/auth.validator.js';
import { registerController } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { loginController } from '../controllers/login.controllers.js';



const router = express();

router.post('/register',registerValidator,registerController);
router.post('/login',loginController)



export default router;