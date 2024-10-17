import { Router } from 'express';
import * as UnitsController from  '../controllers/units.controller';

const router = Router();
router.
    route('/units').
    get(UnitsController.readUnits);

router.
    route('/units/:unitnumber').
    get(UnitsController.readUnitsByUnitNumber);

router.
    route('/units/search/name/:search').
    get(UnitsController.readUnitsByUnitNumberSearch);

router.
    route('/units').
    post(UnitsController.createUnit);

router.
    route('/units').
    put(UnitsController.updateUnit);

router.
    route('/units/:unitId').
    delete(UnitsController.deleteUnit);

export default router;