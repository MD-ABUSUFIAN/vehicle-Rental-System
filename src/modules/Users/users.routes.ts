import { Router } from "express";
import { userController } from "./users.controllers";
import { auth } from "../../middleware/auth";

const route=Router()
route.get('/',auth('admin'),userController.getUser)
route.put('/:userId',auth('admin'),userController.userUpdate)
route.delete('/:userId',auth('admin'),userController.deleteUsers)

export const userRoutes=route;