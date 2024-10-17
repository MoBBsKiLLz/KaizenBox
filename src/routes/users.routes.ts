import { Router } from 'express';
import * as UsersController from  '../controllers/users.controller';

const router = Router();
router.
    route('/users').
    get(UsersController.readUsers);

router.
    route('/users/:username').
    get(UsersController.readUsersByUsername);

router.
    route('/users/search/username/:search').
    get(UsersController.readUsersByUsernameSearch);

router.
    route('/users').
    post(UsersController.createUser);

router.
    route('/users').
    put(UsersController.updateUser);

router.
    route('/users/:userId').
    delete(UsersController.deleteUser);

export default router;