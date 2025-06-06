import express from 'express' 
import { login , logout , signup , checkAuth ,updateProfile} from '../controllers/user.controller.js';
import { protectedData } from '../middlewares/protectedData.js';
const router = express.Router() ; 


router.post("/login" ,login);
router.post("/signup" ,signup);
router.post("/logout" , protectedData ,logout);
router.put("/update" , protectedData ,updateProfile);
router.get("/check" , protectedData ,checkAuth);
export default router ; 