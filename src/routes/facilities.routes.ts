import { Router } from 'express';
import * as FacilitiesController from '../controllers/facilities.controller';
import { authenticateToken } from '../middleware/auth.middleware'; // Import the authentication middleware

const router = Router();

// Define routes and apply the authentication middleware where needed
router
    .route('/facilities')
    .get(authenticateToken, FacilitiesController.readFacilities) // Protect this route
    .post(authenticateToken, FacilitiesController.createFacility) // Protect this route
    .put(authenticateToken, FacilitiesController.updateFacility); // Protect this route

router
    .route('/facilities/:facility_name')
    .get(authenticateToken, FacilitiesController.readFacilitiesByName); // Protect this route

router
    .route('/facilities/search/name/:search')
    .get(authenticateToken, FacilitiesController.readFacilitiesByNameSearch); // Protect this route

router
    .route('/facilities/:facilityId')
    .delete(authenticateToken, FacilitiesController.deleteFacility); // Protect this route

export default router;
