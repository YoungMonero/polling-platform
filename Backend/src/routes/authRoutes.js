import express from 'express';
import { login, register, getCurrentUser, logout } from '../controllers/authController.js';
import { 
    authenticateJWT, 
    authorizeRoles, 
    adminOnly, 
    userOrAdmin,
    checkOwnershipOrAdmin,
} from '../middlewares/authMiddleware.js';
import { loginlimit } from '../middlewares/rateLimit.js';
import { authService } from '../services/authService.js';

const router = express.Router();

// Public routes
router.post('/login', loginlimit, login);
router.post('/register', register);

// Protected routes
router.get('/me', authenticateJWT, getCurrentUser);
router.post('/logout', authenticateJWT, logout);

router.post('/refresh', authenticateJWT, async (req, res) => {
    try {
        const { id, email } = req.user;
        const payload = { id, email };

        const jwt = await import('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
        const newToken = jwt.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            message: 'Token refreshed successfully',
            token: newToken,
            user: { id, email }
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

// Admin routes (simplified for testing)
router.get('/users', authenticateJWT, async (req, res) => {
    try {
        const result = await authService.getAllUsers();
        if (!result.success) {
            return res.status(400).json({ 
                message: result.message,
                error: 'SERVICE_ERROR'
            });
        }
        res.json({ message: 'Users retrieved successfully', users: result.data });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Internal server error', error: 'SERVER_ERROR' });
    }
});

router.get('/users/:userId', authenticateJWT, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await authService.getUserById(userId);
        if (!result.success) {
            return res.status(404).json({ message: result.message, error: 'USER_NOT_FOUND' });
        }
        res.json({ message: 'User retrieved successfully', user: result.data });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({ message: 'Internal server error', error: 'SERVER_ERROR' });
    }
});

router.delete('/users/:userId', authenticateJWT, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (userId === req.user.id) {
            return res.status(400).json({ message: 'You cannot delete your own account', error: 'SELF_DELETION_FORBIDDEN' });
        }
        const result = await authService.deleteUser(userId);
        if (!result.success) {
            return res.status(404).json({ message: result.message, error: 'USER_NOT_FOUND' });
        }
        res.json({ message: result.message, success: true });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error', error: 'SERVER_ERROR' });
    }
});

router.patch('/users/:userId/role', authenticateJWT, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const { role } = req.body;
        const validRoles = ['user', 'admin'];

        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({ 
                message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
                error: 'INVALID_ROLE'
            });
        }
        if (userId === req.user.id) {
            return res.status(400).json({ 
                message: 'You cannot change your own role',
                error: 'SELF_ROLE_CHANGE_FORBIDDEN'
            });
        }
        res.json({ message: 'Role update feature not implemented yet', error: 'NOT_IMPLEMENTED' });
    } catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ message: 'Internal server error', error: 'SERVER_ERROR' });
    }
});

// Health check
router.get('/health', (req, res) => {
    res.json({ message: 'Auth service is healthy', timestamp: new Date().toISOString(), service: 'auth' });
});

// Error handler
router.use((error, req, res, next) => {
    console.error('Auth routes error:', error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: 'VALIDATION_ERROR', details: error.message });
    }
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized', error: 'UNAUTHORIZED' });
    }
    res.status(500).json({ message: 'Internal server error', error: 'SERVER_ERROR' });
});

export default router;