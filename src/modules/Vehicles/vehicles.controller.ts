import { Request, Response } from 'express';
import { vechilesService } from './vehicles.service';


// post method 
const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vechilesService.createVechile(req.body);
    res.status(201).json({
      success: true,
      message: 'vehicles create successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//  update method 
const updateVehicles = async (req: Request, res: Response) => {
  const {vehicleId}=req.params;
  try {
    const result = await vechilesService.updateVehicle(req.body,vehicleId as string);
    res.status(201).json({
      success: true,
      message: 'vehicles update successfully',
      data: result.rows[0] ,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//  delete method 
const deleteVechile=async(req:Request,res:Response)=>{
  const result=await vechilesService.deleteVehicle(req.params.vehicleId as string)
try {
    if(result){
     res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: result.rows[0] ,
    })}
    else{
       res.status(201).json({
      success: true,
      message: 'Vehicle not found',
      
    })
    }
 
} catch (error:any) {
  res.status(404).json({
      success: false,
      message: error.message,
    });
}
}
// get method 
const getAllVechicle = async (req: Request, res: Response) => {
  try {
    const result = await vechilesService.getAllVechile();
    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: 'No Vehicles Found',
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Vehicles retrieved successfully',
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// get by id 
const getSingleVechicle = async (req: Request, res: Response) => {
  try {
    const result = await vechilesService.getSingleVechile(
      req.params.vehicleId as any
    );

    if (result.rows[0]) {
      res.status(200).json({
        success: true,
        message: 'Vehicles retrieved successfully',
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No Vehicles Found',
        data: [],
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getAllVechicle,
  getSingleVechicle,
  updateVehicles,
  deleteVechile
};
