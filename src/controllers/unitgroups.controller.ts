import { Request, RequestHandler, Response } from 'express';
import * as UnitGroupDao from '../dao/unitgroups.dao';
import { OkPacket } from 'mysql';

export const readUnitGroups: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        let unitGroups;
        let unitGroupId = parseInt(req.query.unitGroupId as string);

        console.log('unitGroupId', unitGroupId);
        if (Number.isNaN(unitGroupId)) {
            unitGroups = await UnitGroupDao.readUnitGroups();
        } else {
            unitGroups = await UnitGroupDao.readUnitGroupsByUnitGroupId(unitGroupId);
        }

        res.status(200).json(
            unitGroups
        );
    } catch (error) {
        console.error('[unitgroups.controller][readUnitGroups][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching unitgroups'
        });
    }
};

export const readUnitGroupsByName: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        const unitGroups = await UnitGroupDao.readUnitGroupsByName(req.params.name);

        res.status(200).json(
            unitGroups
        );
    } catch (error) {
        console.error('[unitgroups.controller][readUnitGroups][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching unitgroups'
        });
    }
};

export const readUnitGroupsByNameSearch: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        console.log('search', req.params.search);
        const unitGroups = await UnitGroupDao.readUnitGroupsByNameSearch('%' + req.params.search + '%');

        res.status(200).json(
            unitGroups
        );
    } catch (error) {
        console.error('[unitgroups.controller][readUnitGroups][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching unitgroups'
        });
    }
};

export const createUnitGroup: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UnitGroupDao.createUnitGroup(req.body);
        
        console.log('req.body', req.body);
        console.log('unitGroup', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[unitgroups.controller][createUnitGroup][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing unitgroups'
        })
    }
};

export const updateUnitGroup: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UnitGroupDao.updateUnitGroup(req.body);

        console.log('req.body', req.body);
        console.log('unitGroup', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[unitgroups.controller][updateUnitGroup][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating unitgroups'
        });
    }
};

export const deleteUnitGroup: RequestHandler = async (req: Request, res: Response) => {
    try {
        let unitGroupId = parseInt(req.params.unitGroupId as string);

        console.log('unitGroupId', unitGroupId);
        if (!Number.isNaN(unitGroupId)) {
            const response = await UnitGroupDao.deleteUnitGroup(unitGroupId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for unitGroupId");
        }
    } catch (error) {
        console.error('[unitgroups.controller][deleteUnitGroup][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting unitgroups'
        });
    }
};