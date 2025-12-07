import { Router } from "express";
import { bookingController } from "./bookings.controller";
import { auth } from "../../middleware/auth";


const route=Router();

route.post('/',bookingController.createBooking)
route.get('/',bookingController.getAllBooking)
route.put('/:bookingId',bookingController.bookingUpdate)

export const bookingRoutes=route;