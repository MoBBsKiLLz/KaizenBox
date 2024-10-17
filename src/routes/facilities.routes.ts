import { Router } from 'express';
import * as FacilitiesController from  '../controllers/facilities.controller';

const router = Router();
router.
    route('/facilities').
    get(FacilitiesController.readFacilities);

router.
    route('/facilities/:facility_name').
    get(FacilitiesController.readFacilitiesByName);

router.
    route('/facilities/search/name/:search').
    get(FacilitiesController.readFacilitiesByNameSearch);

router.
    route('/facilities').
    post(FacilitiesController.createFacility);

router.
    route('/facilities').
    put(FacilitiesController.updateFacility);

router.
    route('/facilities/:facilityId').
    delete(FacilitiesController.deleteFacility);

export default router;