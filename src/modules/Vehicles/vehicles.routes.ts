import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const route=Router();

route.post('/vehicles',auth("admin"),vehiclesController.createVehicles)
route.get('/vehicles',vehiclesController.getAllVechicle)
route.get('/vehicles/:vehicleId',auth("admin"),vehiclesController.getSingleVechicle)
route.put('/vehicles/:vehicleId',auth("admin"),vehiclesController.updateVehicles)
route.delete('/vehicles/:vehicleId',auth("admin"),vehiclesController.deleteVechile)


export const vechileRoutes=route;