// src/dao/users.dao.ts
import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { User } from '../models/users.model';
import { userQueries } from './queries/users.queries';
import { hash } from "bcrypt";

export class UserDao {
    async readUsers() {
        return execute<User[]>(userQueries.readUsers, []);
    }

    async readUserByUsername(username: string) {
        const users = await execute<User[]>(userQueries.readUsersByUsername, [username]);
        return users; // Return the array of users, which may be empty
    }    

    async readUsersByUsernameSearch(search: string) {
        console.log('search param', search);
        return execute<User[]>(userQueries.readUsersByUsernameSearch, [search]);
    }

    async readUsersByUserId(userId: number) {
        return execute<User[]>(userQueries.readUsersByUserId, [userId]);
    }

    async createUser(user: User): Promise<User> {
        // First, execute the insert query
        await execute<OkPacket>(userQueries.createUser, [user.username, user.password]);
    
        // Now retrieve the last inserted userId
        const newUser = await this.readUserByUsername(user.username);
        const newUserId = newUser[0].userId; // Access the userId from the result
    
        // Return the new user object including the auto-generated userId
        return {
            ...user, // Spread the original user properties
            userId: newUserId, // Set the new userId
        };
    }
    
    async updateUser(user: User) {
        return execute<OkPacket>(userQueries.updateUser, [user.username, user.password, user.userId]);
    }

    async deleteUser(userId: number) {
        return execute<OkPacket>(userQueries.deleteUser, [userId]);
    }

    async assignFacilityToUser(userId: number, facilityId: number) {
        return execute<OkPacket>(userQueries.assignFacilityToUser, [userId, facilityId]);
    }
}
