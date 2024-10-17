import { Request, RequestHandler, Response } from 'express';
import * as FacilityDao from '../dao/facilities.dao';
import { OkPacket } from 'mysql';

export const readFacilities: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        let facilities;
        let facilityId = parseInt(req.query.facilityId as string);

        console.log('facilityId', facilityId);
        if (Number.isNaN(facilityId)) {
            facilities = await FacilityDao.readFacilities();
        } else {
            facilities = await FacilityDao.readFacilitiesByFacilityId(facilityId);
        }

        res.status(200).json(
            facilities
        );
    } catch (error) {
        console.error('[facilities.controller][readFacilities][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching facilities'
        });
    }
};

export const readFacilitiesByName: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        const facilities = await FacilityDao.readFacilitiesByName(req.params.facility_name);

        res.status(200).json(
            facilities
        );
    } catch (error) {
        console.error('[facilities.controller][readFacilities][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching facilities'
        });
    }
};

export const readFacilitiesByNameSearch: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        console.log('search', req.params.search);
        const facilities = await FacilityDao.readFacilitiesByNameSearch('%' + req.params.search + '%');

        res.status(200).json(
            facilities
        );
    } catch (error) {
        console.error('[facilities.controller][readFacilities][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching facilities'
        });
    }
};

export const createFacility: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await FacilityDao.createFacility(req.body);
        
        console.log('req.body', req.body);
        console.log('facility', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[facilities.controller][createFacility][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing facilities'
        })
    }
};

export const updateFacility: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await FacilityDao.updateFacility(req.body);

        console.log('req.body', req.body);
        console.log('facility', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[facilities.controller][updateFacility][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating facilities'
        });
    }
};

export const deleteFacility: RequestHandler = async (req: Request, res: Response) => {
    try {
        let facilityId = parseInt(req.params.facilityId as string);

        console.log('facilityId', facilityId);
        if (!Number.isNaN(facilityId)) {
            const response = await FacilityDao.deleteFacility(facilityId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for facilityId");
        }
    } catch (error) {
        console.error('[facilities.controller][deleteFacility][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting facilities'
        });
    }
};