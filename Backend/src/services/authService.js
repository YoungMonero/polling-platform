import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/index.js';

dotenv.config();

const SALT_ROUNDS = 10;

class AuthService {
  async hashPassword(password) {
    return bcryptjs.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password, hash) {
    return bcryptjs.compare(password, hash);
  }

  /**
   * Authenticate user with email and password
   */
  async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return { success: false, message: 'Invalid credentials' };
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email
        }
      };
    } catch (error) {
      console.error('Authentication service error:', error);
      throw new Error('Authentication service failed');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      return {
        success: true,
        data: { id: user.id, email: user.email }
      };
    } catch (error) {
      console.error('Get user by ID service error:', error);
      throw new Error('Get user service failed');
    }
  }

  /**
   * Create new user
   */
  async createUser(email, password) {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return { success: false, message: 'Email already exists' };
      }

      const newUser = await User.create({
        email,
        password // Model will hash this automatically
      });

      return {
        success: true,
        data: { id: newUser.id, email: newUser.email },
        message: 'User created successfully'
      };
    } catch (error) {
      console.error('Create user service error:', error);
      throw new Error('User creation service failed');
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'createdAt', 'updatedAt']
      });

      return { success: true, data: users };
    } catch (error) {
      console.error('Get all users service error:', error);
      throw new Error('Get users service failed');
    }
  }

  /**
   * Delete user by ID (admin only)
   */
  async deleteUser(userId) {
    try {
      const deleted = await User.destroy({ where: { id: userId } });

      if (!deleted) {
        return { success: false, message: 'User not found' };
      }

      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Delete user service error:', error);
      throw new Error('Delete user service failed');
    }
  }
}

export const authService = new AuthService();
export default AuthService;
