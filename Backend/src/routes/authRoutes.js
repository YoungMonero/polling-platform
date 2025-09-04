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




// Public routes (no authentication required)

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
routes.post('/login', loginlimit, login)

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', register);

// Protected routes (authentication required)

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user's information
 * @access  Private
 */
router.get('/me', authenticateJWT, getCurrentUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (token invalidation on client side)
 * @access  Private
 */
router.post('/logout', authenticateJWT, logout);

/**
 * @route   GET /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', authenticateJWT, async (req, res) => {
    try {
        const { id, username, role } = req.user;
        
        // Create new JWT payload
        const payload = { id, username, role };
        
        // Sign new JWT token
        const jwt = await import('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
        const newToken = jwt.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            message: 'Token refreshed successfully',
            token: newToken,
            user: { id, username, role }
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

// Admin only routes

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get('/users', authenticateJWT, adminOnly, async (req, res) => {
    try {
        const result = await authService.getAllUsers();
        
        if (!result.success) {
            return res.status(400).json({ 
                message: result.message,
                error: 'SERVICE_ERROR'
            });
        }

        res.json({
            message: 'Users retrieved successfully',
            users: result.data
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

/**
 * @route   GET /api/auth/users/:userId
 * @desc    Get specific user by ID (Admin or own profile)
 * @access  Private/Admin or Own
 */
router.get('/users/:userId', authenticateJWT, checkOwnershipOrAdmin('userId'), async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await authService.getUserById(userId);
        
        if (!result.success) {
            return res.status(404).json({ 
                message: result.message,
                error: 'USER_NOT_FOUND'
            });
        }

        res.json({
            message: 'User retrieved successfully',
            user: result.data
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

/**
 * @route   DELETE /api/auth/users/:userId
 * @desc    Delete user by ID (Admin only)
 * @access  Private/Admin
 */
router.delete('/users/:userId', authenticateJWT, adminOnly, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        
        // Prevent admin from deleting themselves
        if (userId === req.user.id) {
            return res.status(400).json({ 
                message: 'You cannot delete your own account',
                error: 'SELF_DELETION_FORBIDDEN'
            });
        }

        const result = await authService.deleteUser(userId);
        
        if (!result.success) {
            return res.status(404).json({ 
                message: result.message,
                error: 'USER_NOT_FOUND'
            });
        }

        res.json({
            message: result.message,
            success: true
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

/**
 * @route   POST /api/auth/users/:userId/role
 * @desc    Update user role (Admin only)
 * @access  Private/Admin
 */
router.patch('/users/:userId/role', authenticateJWT, adminOnly, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const { role } = req.body;
        
        // Validate role
        const validRoles = ['user', 'admin'];
        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({ 
                message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
                error: 'INVALID_ROLE'
            });
        }

        // Prevent admin from changing their own role
        if (userId === req.user.id) {
            return res.status(400).json({ 
                message: 'You cannot change your own role',
                error: 'SELF_ROLE_CHANGE_FORBIDDEN'
            });
        }

        // This would be implemented in authService in a real app
        // For now, return a placeholder response
        res.json({ 
            message: 'Role update feature not implemented yet',
            error: 'NOT_IMPLEMENTED'
        });
    } catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
});

// Health check route for auth service
/**
 * @route   GET /api/auth/health
 * @desc    Auth service health check
 * @access  Public
 */
router.get('/health', (req, res) => {
    res.json({
        message: 'Auth service is healthy',
        timestamp: new Date().toISOString(),
        service: 'auth'
    });
});

// Error handling middleware for auth routes
router.use((error, req, res, next) => {
    console.error('Auth routes error:', error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            error: 'VALIDATION_ERROR',
            details: error.message
        });
    }
    
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'UNAUTHORIZED'
        });
    }
    
    // Default error response
    res.status(500).json({
        message: 'Internal server error',
        error: 'SERVER_ERROR'
    });
});

export default router;
