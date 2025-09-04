import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

// In-memory users storage (replace with database in production)
let users = [
    { 
        id: 1, 
        username: 'user1', 
        password: '$2b$10$KXzLUUpglaZO9DaB0BGqPu.fS48Tl7Q3wf4q/GtCiwceXHpzzywDK', // 'password1' hashed
        role: 'user' 
    },
    { 
        id: 2, 
        username: 'admin', 
        password: '$2b$10$aYoBiDUROTqcRSWt1.XE0egMfqJX9HL0NTlZATyPeEUHAiGqWvlUi', // 'admin123' hashed
        role: 'admin' 
    }
];

let nextUserId = 3;

class AuthService {
    /**
     * Hash a password
     * @param {string} password - Plain text password
     * @returns {Promise<string>} - Hashed password
     */
    async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            return hashedPassword;
        } catch (error) {
            throw new Error('Password hashing failed');
        }
    }

    /**
     * Compare password with hash
     * @param {string} password - Plain text password
     * @param {string} hash - Hashed password
     * @returns {Promise<boolean>} - Match result
     */
    async comparePassword(password, hash) {
        try {
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch;
        } catch (error) {
            throw new Error('Password comparison failed');
        }
    }

    /**
     * Authenticate user with username and password
     * @param {string} username - Username
     * @param {string} password - Plain text password
     * @returns {Promise<Object>} - Authentication result
     */
    async authenticateUser(username, password) {
        try {
            const user = users.find(u => u.username === username);
            
            if (!user) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            const isPasswordValid = await this.comparePassword(password, user.password);
            
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            return {
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            };
        } catch (error) {
            console.error('Authentication service error:', error);
            throw new Error('Authentication service failed');
        }
    }

    /**
     * Get user by ID
     * @param {number} userId - User ID
     * @returns {Promise<Object>} - User data result
     */
    async getUserById(userId) {
        try {
            const user = users.find(u => u.id === userId);
            
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            return {
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            };
        } catch (error) {
            console.error('Get user by ID service error:', error);
            throw new Error('Get user service failed');
        }
    }

    /**
     * Get user by username
     * @param {string} username - Username
     * @returns {Promise<Object>} - User data result
     */
    async getUserByUsername(username) {
        try {
            const user = users.find(u => u.username === username);
            
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            return {
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            };
        } catch (error) {
            console.error('Get user by username service error:', error);
            throw new Error('Get user service failed');
        }
    }

    /**
     * Create new user
     * @param {string} username - Username
     * @param {string} password - Plain text password
     * @param {string} role - User role (default: 'user')
     * @returns {Promise<Object>} - Creation result
     */
    async createUser(username, password, role = 'user') {
        try {
            // Check if user already exists
            const existingUser = users.find(u => u.username === username);
            if (existingUser) {
                return {
                    success: false,
                    message: 'Username already exists'
                };
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);

            // Create new user
            const newUser = {
                id: nextUserId++,
                username,
                password: hashedPassword,
                role
            };

            users.push(newUser);

            return {
                success: true,
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    role: newUser.role
                },
                message: 'User created successfully'
            };
        } catch (error) {
            console.error('Create user service error:', error);
            throw new Error('User creation service failed');
        }
    }

    /**
     * Get all users (admin only)
     * @returns {Promise<Object>} - Users list result
     */
    async getAllUsers() {
        try {
            const userList = users.map(user => ({
                id: user.id,
                username: user.username,
                role: user.role
            }));

            return {
                success: true,
                data: userList
            };
        } catch (error) {
            console.error('Get all users service error:', error);
            throw new Error('Get users service failed');
        }
    }

    /**
     * Delete user by ID (admin only)
     * @param {number} userId - User ID to delete
     * @returns {Promise<Object>} - Deletion result
     */
    async deleteUser(userId) {
        try {
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex === -1) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            users.splice(userIndex, 1);

            return {
                success: true,
                message: 'User deleted successfully'
            };
        } catch (error) {
            console.error('Delete user service error:', error);
            throw new Error('Delete user service failed');
        }
    }
}

// Create and export singleton instance
export const authService = new AuthService();

// Also export the class for testing purposes
export default AuthService;
