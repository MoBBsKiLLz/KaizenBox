import { Router } from 'express';
import * as UnitGroupsController from  '../controllers/unitgroups.controller';

const router = Router();
router.
    route('/unitgroups').
    get(UnitGroupsController.readUnitGroups);

router.
    route('/unitgroups/:name').
    get(UnitGroupsController.readUnitGroupsByName);

router.
    route('/unitgroups/search/name/:search').
    get(UnitGroupsController.readUnitGroupsByNameSearch);

router.
    route('/unitgroups').
    post(UnitGroupsController.createUnitGroup);

router.
    route('/unitgroups').
    put(UnitGroupsController.updateUnitGroup);

router.
    route('/unitgroups/:unitGroupId').
    delete(UnitGroupsController.deleteUnitGroup);

export default router;