import { Router } from "express";
import { userController } from "./users.controllers";

const route=Router()
route.get('/',userController.getUser)
route.put('/:userId',userController.userUpdate)
route.delete('/:userId',userController.deleteUsers)

export const userRoutes=route;