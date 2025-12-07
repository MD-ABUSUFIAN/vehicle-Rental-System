import express, { NextFunction, Request, Response } from 'express';
import { initDB } from './config/db';
import { vechileRoutes } from './modules/Vehicles/vehicles.routes';
import { authRouters } from './modules/Authentication/auth.routes';
import { userRoutes } from './modules/Users/users.routes';
import { bookingRoutes } from './modules/Bookings/bookings.routes';
const app = express();

app.use(express.json());

// database initialization
initDB();

// vehicles routes
app.use('/api/v1', vechileRoutes);
// auth routes
app.use('/api/v1/auth', authRouters);

// users Routes
app.use('/api/v1/users', userRoutes);

// Booking Route
app.use('/api/v1/bookings', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// 404 route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: 'false',
    message: 'Route Not Found',
    path: req.path,
  });
});

export default app;
