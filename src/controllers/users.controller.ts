import { Request, RequestHandler, Response } from 'express';
import * as UserDao from '../dao/users.dao';
import * as FacilityDao from '../dao/facilities.dao';
import { User } from '../models/users.model';
import { OkPacket } from 'mysql';

export const readUsers: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        let users;
        let userId = parseInt(req.query.userId as string);

        console.log('userId', userId);
        if (Number.isNaN(userId)) {
            users = await UserDao.readUsers();
        } else {
            users = await UserDao.readUsersByUserId(userId);
        }

        await readFacilities(users, res);

        res.status(200).json(
            users
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};

export const readUsersByUsername: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        const users = await UserDao.readUsersByUsername(req.params.username);

        await readFacilities(users, res);

        res.status(200).json(
            users
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};

export const readUsersByUsernameSearch: RequestHandler = async ( req: Request, res: Response ) => {
    try {
        console.log('search', req.params.search);
        const users = await UserDao.readUsersByUsernameSearch('%' + req.params.search + '%');

        await readFacilities(users, res);

        res.status(200).json(
            users
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};

export const createUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Check for facilities existence
        const facilities = req.body.facilities || [];
        const existingFacilities = await FacilityDao.checkFacilitiesExist(facilities);
        
        // If there are any invalid facilities, return an error response
        if (existingFacilities.length !== facilities.length) {
            res.status(400).json({
                message: 'One or more facility IDs are invalid. User not created.',
            });
            return;
        } 

        // Proceed with user creation if all facility IDs are valid
        const okPacket: OkPacket = await UserDao.createUser(req.body);
        const userId = okPacket.insertId;

        console.log('req.body', req.body);
        console.log('user', okPacket);

        // Use Promise.all to handle all assignments concurrently
        await Promise.all(facilities.map(async (facilityId: number) => {
            try {
                await UserDao.assignFacilityToUser(userId, facilityId);
            } catch (error) {
                console.error('[users.controller][createUserFacilities][Error]', error);
                throw new Error(`There was an error when assigning facility ${facilityId} to the user`);
            }
        }));

        // If all assignments succeed, return the user creation response
        res.status(200).json(okPacket);

    } catch (error) {
        console.error('[users.controller][createUser][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing users',
        });
    }
};


export const updateUser: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UserDao.updateUser(req.body);
        const userId = req.body.userId;

        console.log('req.body', req.body);
        console.log('user', okPacket);

        req.body.facilities.forEach(async (facilityId: number) => {
            try {
                await UserDao.assignFacilityToUser(userId, facilityId);
            } catch (error) {
                console.error('[users.controller][updateUser][Error]', error);
                res.status(500).json({
                    message: 'There was an error when updating the user facilities'
                });
            }
        });

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[users.controller][updateUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating users'
        });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.userId as string);

        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            const response = await UserDao.deleteUser(userId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for userId");
        }
    } catch (error) {
        console.error('[users.controller][deleteUser][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting users'
        });
    }
};

async function readFacilities (users: User[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < users.length; i++) {
        try {
            const facilities = await FacilityDao.readFacilitiesByUserId(users[i].userId);
            users[i].facilities = facilities;
        } catch (error) {
            console.error('[users.controller][readFacilities][Error]', error);
            res.status(500).json({
                message: 'There was an error when fetching user facilities'
            });
        }
    }
};
