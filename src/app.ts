import 'reflect-metadata';
import dotenv from "dotenv"; // Import environment variables
import express, { Request, Response } from 'express'; // Import ExpressJS
import usersRouter from './routes/users.routes';
import facilitiesRouter from './routes/facilities.routes';
import unitGroupsRouter from './routes/unitgroups.routes';
import unitsRouter from './routes/units.routes';
import authRoutes from './routes/auth.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config({ path: "./.env", debug: true }); // Load environment variables

console.log('Logged JWT_SECRET from app.ts:', process.env.JWT_SECRET); 

const app = express(); // Using ExpressJS
const port = 3000; // Port used

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable all CORS requests
app.use(cors({
    origin: 'http://192.168.68.77:3001' // Replace with your frontend's network IP and port
  }));

// Adding set of security middleware
app.use(helmet());


if (process.env.NODE_ENV == 'development') {
    // Add logger middleware
    app.use(logger);
    console.log(process.env.GRETTING + ' in dev mode');
}

// Register routes after middleware
app.use('/', [authRoutes, usersRouter, facilitiesRouter, unitGroupsRouter, unitsRouter]);

// Start the server
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
