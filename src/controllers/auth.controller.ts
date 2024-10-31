import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config'; // Import from the config module

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await this.authService.login(username, password);
    
    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.userId, username: user.username }, 
        jwtSecret!, // Use the imported secret
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token }); // Include token in the response
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  async register(req: Request, res: Response) {
    const registerDto: RegisterDto = req.body;

    try {
        const user = await this.authService.register(registerDto);
        res.status(201).json(user); // Return the created user or a success message
    } catch (error) {
        console.error('[auth.controller][register][Error]', error);
        res.status(500).json({
            message: 'There was an error registering the user',
        });
    }
  }
}
