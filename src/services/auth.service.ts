// src/services/auth.service.ts
import { injectable } from 'inversify';
import { User } from '../models/users.model';
import { UserDao } from '../dao/users.dao'; // Import the UserDao class
import { compare, hash } from 'bcrypt';
import { RegisterDto } from '../dto/register.dto'; // Adjust the import based on your file structure

@injectable()
export class AuthService {
    constructor(private userDao: UserDao) {}

    async login(username: string, password: string): Promise<User | null> {
        const users = await this.userDao.readUserByUsername(username);
        if (users.length === 0) {
            return null; // Return null if no users are found
        }
        const user = users[0];
        console.log("User: ", user);
        console.log("Password: ", password);
        console.log("Compare result: ", await compare(password, user.password));
        if (user && await compare(password, user.password)) {
            return user; // Return user if credentials are valid
        }
        return null; // Invalid credentials
    }

    async register(registerDto: RegisterDto): Promise<User | null> {
        const hashedPassword = await hash(registerDto.password, 10);
        
        const newUser: User = {
            userId: 0,
            username: registerDto.username,
            password: hashedPassword,
        };
    
        // Create user and get the user with the assigned userId
        const createdUser = await this.userDao.createUser(newUser);
        return createdUser; // Return the user including the actual userId
    }
}
