import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request,Response } from "express"
import { config } from '../config';

export const auth=(...role:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.headers.authorization;
        if(!token){
            return res.status(500).json({
                success:false,message:'Unauthorized'
            })
        }
        const decodedToken=jwt.verify(token as string,config.secret as string) as JwtPayload
        req.user=decodedToken;
        if(role.length && !role.includes(decodedToken.role )){
            return res.status(500).json({
                success:false,
                message:"Your are not Authorized for this routes!!!!"
            })
        }
        next()
        } catch (error:any) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
        
    }
}