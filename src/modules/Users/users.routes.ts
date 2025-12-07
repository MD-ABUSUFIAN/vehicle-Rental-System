import { Router } from "express";
import { userController } from "./users.controllers";
import { auth } from "../../middleware/auth";

const route=Router()
route.get('/',auth('admin'),userController.getUser)
route.put('/:userId',userController.userUpdate)
route.delete('/:userId',userController.deleteUsers)

export const userRoutes=route;