import { Request,Response } from "express";
import { bookingservice } from "./bookings.service";

const createBooking=async(req:Request,res:Response)=>{

    const booked=await bookingservice.createBooking(req.body)
 try {
    if(!booked){
    res.status(404).json({
        success:false,
        message:"Booking not created",
        data:[]
    })
 }
 else{
    res.status(200).json({
        success:true,
        message:"Your bookings Retrieved Successfully",
        data:[booked]

    })
 }

}
catch(err:any){
    success:false;
    message:err.message
}

  }

// get all booking method 
const getAllBooking=async(req:Request,res:Response)=>{
    try {
       const result=await bookingservice.getAllBooking()
       if(result.rows.length==0){
            res.status(404).json({
            success:false,
            message:"Booking NotFound",
            data:result.rows[0]
        })
       }
       else{
          res.status(200).json({
            success:true,
            message:"Bookings retrieved successfully",
            data:result.rows
        })
       }
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

// update booking 
const bookingUpdate=async(req:Request,res:Response)=>{
    try {
    const result=await bookingservice.updateBooking(req.body,req.params.bookingId as string)
    console.log(result?.rows[0].status)
    if(!result){
  res.status(404).json({
        success:true,
        message:"Booking Not Found",
    })
    }
   
  
    if(result?.rows[0].status=="cancelled" ||result?.rows[0].status=="returned"){
    res.status(200).json({
        success:true,
        message:"Booking cancelled successfully",
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


export const bookingController={
    createBooking,
    getAllBooking,
    bookingUpdate
}