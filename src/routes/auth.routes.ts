// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserDao } from '../dao/users.dao';

const router = Router();
const userDao = new UserDao(); // Instantiate UserDao
const authService = new AuthService(userDao); // Pass UserDao to AuthService
const authController = new AuthController(authService);

router.
    post('/auth/login', (req, res) => 
    authController.login(req, res));

router.
    post('/auth/register', (req, res) => 
    authController.register(req, res));

export default router;
