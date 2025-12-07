import { Router } from "express";
import { authController } from "./auth.controllers";

const router=Router();

router.post('/signup',authController.authSignup)
router.post('/signin',authController.authSignin)


export const authRouters=router;