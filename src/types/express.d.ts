import { User } from '../models/user.model'; // adjust the path based on your project structure

declare global {
  namespace Express {
    interface Request {
      user?: User; // Mark as optional if the `user` property might not always be present
    }
  }
}
