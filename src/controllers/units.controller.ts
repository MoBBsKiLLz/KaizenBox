import { Request, RequestHandler, Response } from 'express';
import * as UnitDao from '../dao/units.dao';
import { OkPacket } from 'mysql';

export const readUnits: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        let units;
        let unitId = parseInt(req.query.unitId as string);

        console.log('unitId', unitId);
        if (Number.isNaN(unitId)) {
            units = await UnitDao.readUnits();
        } else {
            units = await UnitDao.readUnitsByUnitId(unitId);
        }

        res.status(200).json(
            units
        );
    } catch (error) {
        console.error('[units.controller][readUnits][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching units'
        });
    }
};

export const readUnitsByUnitNumber: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        const units = await UnitDao.readUnitsByUnitNumber(req.params.unitnumber);

        res.status(200).json(
            units
        );
    } catch (error) {
        console.error('[units.controller][readUnits][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching units'
        });
    }
};

export const readUnitsByUnitNumberSearch: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        console.log('search', req.params.search);
        const units = await UnitDao.readUnitsByUnitNumberSearch('%' + req.params.search + '%');

        res.status(200).json(
            units
        );
    } catch (error) {
        console.error('[units.controller][readUnits][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching units'
        });
    }
};

export const createUnit: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UnitDao.createUnit(req.body);
        
        console.log('req.body', req.body);
        console.log('unit', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[units.controller][createUnit][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing units'
        })
    }
};

export const updateUnit: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UnitDao.updateUnit(req.body);

        console.log('req.body', req.body);
        console.log('unit', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[units.controller][updateUnit][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating units'
        });
    }
};

export const deleteUnit: RequestHandler = async (req: Request, res: Response) => {
    try {
        let unitId = parseInt(req.params.unitId as string);

        console.log('unitId', unitId);
        if (!Number.isNaN(unitId)) {
            const response = await UnitDao.deleteUnit(unitId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for unitId");
        }
    } catch (error) {
        console.error('[units.controller][deleteUnit][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting units'
        });
    }
};