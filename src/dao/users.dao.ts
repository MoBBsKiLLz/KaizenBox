import { OkPacket } from "mysql";
import { execute } from '../services/mysql.connector';
import { User } from '../models/users.model';
import { userQueries } from './queries/users.queries';

export const readUsers = async () => {
    return execute<User[]>(userQueries.readUsers, []);
};

export const readUsersByUsername = async (username: string) => {
    return execute<User[]>(userQueries.readUsersByUsername, [username]);
};

export const readUsersByUsernameSearch = async (search: string) => {
    console.log('search param', search);
    return execute<User[]>(userQueries.readUsersByUsernameSearch, [search]);
};

export const readUsersByUserId = async (userId: number) => {
    return execute<User[]>(userQueries.readUsersByUserId, [userId]);
};

export const createUser = async (user: User) => {
  return execute<OkPacket>(userQueries.createUser,
    [user.username, user.password]);  
};

export const updateUser = async (user: User) => {
    return execute<OkPacket>(userQueries.updateUser,
        [user.username, user.password, user.userId]);
};

export const deleteUser = async (userId: number) => {
    return execute<OkPacket>(userQueries.deleteUser, [userId]);
};