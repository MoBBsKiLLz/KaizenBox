import { Request, RequestHandler, Response } from 'express';
import * as UserDao from '../dao/users.dao';
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

export const createUser: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UserDao.createUser(req.body);
        
        console.log('req.body', req.body);
        console.log('user', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[users.controller][createUser][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing users'
        })
    }
};

export const updateUser: RequestHandler = async ( req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UserDao.updateUser(req.body);

        console.log('req.body', req.body);
        console.log('user', okPacket);

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