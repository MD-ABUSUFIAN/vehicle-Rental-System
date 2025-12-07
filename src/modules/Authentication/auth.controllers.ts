import { Request,Response } from "express";
import { authService } from "./auth.service";


// auth signup users 
const authSignup=async(req:Request,res:Response)=>{

    try {
    const result=await authService.authSignupService(req.body)
    res.status(201).json({
        success:true,
        message:"User registered successfully",
        data:result?.rows[0]
    })
        
    } catch (error:any) {
        res.status(404).json({
        success:false,
        message:error.message,

    })
    }

}
// auth signin users 
const authSignin=async(req:Request,res:Response)=>{

    try {
    const result=await authService.authSignInService(req.body)
    console.log(result)
  
    res.status(200).json({
        success:true,
        message:"Login successful",
        data:result
    })
        
    } catch (error:any) {
        res.status(404).json({
        success:false,
        message:error.message,

    })
    }

}

export const authController={
authSignup,
authSignin
}