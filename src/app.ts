import dotenv from "dotenv"; // Import environment variables
import express, { Request, Response } from 'express'; // Import ExpressJS
import usersRouter from './routes/users.routes';
import facilitiesRouter from './routes/facilities.routes';
import unitGroupsRouter from './routes/unitgroups.routes';
import unitsRouter from './routes/units.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config({ path: "./.env" }); // Load environment variables

const app = express(); // Using ExpressJS
const port = 3000; // Port used

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable all CORS requests
app.use(cors());

// Adding set of security middleware
app.use(helmet());


if (process.env.NODE_ENV == 'development') {
    // Add logger middleware
    app.use(logger);
    console.log(process.env.GRETTING + ' in dev mode');
}

// Register routes after middleware
app.use('/', [usersRouter, facilitiesRouter, unitGroupsRouter, unitsRouter]);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
