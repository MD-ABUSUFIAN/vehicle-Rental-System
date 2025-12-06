import { Request,Response} from "express";
import { userService } from "./users.service";

const getUser=async(req:Request,res:Response)=>{
    try {
       const result=await userService.userGetService()
       if(result.rows.length==0){
            res.status(201).json({
            success:false,
            message:"Users NotFound",
            data:result.rows[0]
        })
       }
       else{
          res.status(200).json({
            success:true,
            message:"Users retrieved successfully",
            data:result.rows
        })
       }
        
    } catch (error:any) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }

}

const userUpdate=async(req:Request,res:Response)=>{
    try {
    const result=await userService.updateUsers(req.body,req.params.userId as string)
    console.log(result.rows)
    if(!result){
  res.status(404).json({
        success:true,
        message:"User Not Found",

    })
    }
  else{
      res.status(200).json({
        success:true,
        message:"User update successfully",
        data:result?.rows[0]
    })
  }
        
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:error.message,

    })
    }

}

//  delete method 
const deleteUsers=async(req:Request,res:Response)=>{
  const result=await userService.deleteUsers(req.params.userId as string)
try {
    if(result){
     res.status(200).json({
      success: true,
      message: 'users deleted successfully',
      data: result.rows[0] ,
    })}
    else{
       res.status(404).json({
      success: false,
      message: 'user not found',
      
    })
    }
 
} catch (error:any) {
  res.status(500).json({
      success: false,
      message: error.message,
    });
}
}

export const userController={
    getUser,
    userUpdate,
    deleteUsers
}