import { Router } from "express";
import { authController } from "./auth.controllers";

const router=Router();

router.post('/signup',authController.authPostController)


export const authRouters=router;