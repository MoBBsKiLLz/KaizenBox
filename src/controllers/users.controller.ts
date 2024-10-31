import { Request, RequestHandler, Response } from 'express';
import { UserDao } from '../dao/users.dao'; // Import the UserDao class
import * as FacilityDao from '../dao/facilities.dao';
import { User } from '../models/users.model';
import { OkPacket } from 'mysql';

// Create an instance of UserDao
const userDao = new UserDao();

export const readUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        let users;
        let userId = parseInt(req.query.userId as string);

        console.log('userId', userId);
        if (Number.isNaN(userId)) {
            users = await userDao.readUsers(); // Call the UserDao method
        } else {
            users = await userDao.readUsersByUserId(userId); // Call the UserDao method
        }

        await readFacilities(users, res);

        res.status(200).json(users);
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users',
        });
    }
};

export const readUsersByUsername: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users = await userDao.readUserByUsername(req.params.username); // Call the UserDao method
        
        await readFacilities(users, res);

        res.status(200).json(users);
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users',
        });
    }
};

export const readUsersByUsernameSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const users = await userDao.readUsersByUsernameSearch('%' + req.params.search + '%'); // Call the UserDao method

        await readFacilities(users, res);

        res.status(200).json(users);
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users',
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
        const okPacket: any = await userDao.createUser(req.body); // Call the UserDao method
        const userId = okPacket.insertId;

        console.log('req.body', req.body);
        console.log('user', okPacket);

        // Use Promise.all to handle all assignments concurrently
        await Promise.all(facilities.map(async (facilityId: number) => {
            try {
                await userDao.assignFacilityToUser(userId, facilityId); // Call the UserDao method
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

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await userDao.updateUser(req.body); // Call the UserDao method
        const userId = req.body.userId;

        console.log('req.body', req.body);
        console.log('user', okPacket);

        await Promise.all(req.body.facilities.map(async (facilityId: number) => {
            try {
                await userDao.assignFacilityToUser(userId, facilityId); // Call the UserDao method
            } catch (error) {
                console.error('[users.controller][updateUser][Error]', error);
                res.status(500).json({
                    message: 'There was an error when updating the user facilities',
                });
            }
        }));

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[users.controller][updateUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating users',
        });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.userId as string);

        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            const response = await userDao.deleteUser(userId); // Call the UserDao method

            res.status(200).json(response);
        } else {
            throw new Error("Integer expected for userId");
        }
    } catch (error) {
        console.error('[users.controller][deleteUser][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting users',
        });
    }
};

async function readFacilities(users: User[], res: Response<any, Record<string, any>>) {
    if (!users || users.length === 0) {
        return; // Return early if users is null or an empty array
    }

    for (let i = 0; i < users.length; i++) {
        try {
            // Ensure userId is defined before calling the DAO
            if (users[i].userId !== undefined) {
                const facilities = await FacilityDao.readFacilitiesByUserId(users[i].userId);
                users[i].facilities = facilities;
            } else {
                console.warn(`[users.controller][readFacilities][Warning] User ID is undefined for user at index ${i}`);
            }
        } catch (error) {
            console.error('[users.controller][readFacilities][Error]', error);
            res.status(500).json({
                message: 'There was an error when fetching user facilities',
            });
            return; // Return to avoid further processing
        }
    }
};
