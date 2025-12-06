import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const route=Router();

route.post('/vehicles',vehiclesController.createVehicles)
route.get('/vehicles',vehiclesController.getAllVechicle)
route.get('/vehicles/:vehicleId',vehiclesController.getSingleVechicle)
route.put('/vehicles/:vehicleId',vehiclesController.updateVehicles)
route.delete('/vehicles/:vehicleId',vehiclesController.deleteVechile)


export const routes=route;