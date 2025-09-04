import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

/**
 * JWT Authentication Middleware
 * Verifies JWT token and adds user info to request object
 */
export const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if authorization header exists
        if (!authHeader) {
            return res.status(401).json({ 
                message: 'Authorization header missing',
                error: 'AUTHORIZATION_MISSING'
            });
        }

        // Extract token from Bearer <token>
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: 'Token missing',
                error: 'TOKEN_MISSING'
            });
        }

        // Verify JWT token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err.message);
                
                let errorMessage = 'Invalid token';
                if (err.name === 'TokenExpiredError') {
                    errorMessage = 'Token expired';
                } else if (err.name === 'JsonWebTokenError') {
                    errorMessage = 'Invalid token format';
                }

                return res.status(403).json({ 
                    message: errorMessage,
                    error: 'TOKEN_INVALID'
                });
            }

            // Add user info to request object
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Authentication middleware error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
};

/**
 * Role-based authorization middleware
 * @param {string|Array<string>} allowedRoles - Single role or array of allowed roles
 * @returns {Function} Middleware function
 */
export const authorizeRoles = (allowedRoles) => {
    // Convert single role to array for consistency
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    return (req, res, next) => {
        try {
            // Check if user exists (should be set by authenticateJWT)
            if (!req.user) {
                return res.status(401).json({ 
                    message: 'User not authenticated',
                    error: 'USER_NOT_AUTHENTICATED'
                });
            }

            // Check if user has required role
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: `Access denied. Required roles: ${roles.join(', ')}`,
                    error: 'ACCESS_DENIED'
                });
            }

            next();
        } catch (error) {
            console.error('Authorization middleware error:', error);
            res.status(500).json({ 
                message: 'Internal server error',
                error: 'SERVER_ERROR'
            });
        }
    };
};

/**
 * Admin only middleware (shorthand for authorizeRoles(['admin']))
 */
export const adminOnly = authorizeRoles(['admin']);

/**
 * User or Admin middleware (shorthand for authorizeRoles(['user', 'admin']))
 */
export const userOrAdmin = authorizeRoles(['user', 'admin']);

/**
 * Optional authentication middleware
 * Sets user info if token is valid, but doesn't fail if missing
 */
export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // If no auth header, continue without user info
        if (!authHeader) {
            return next();
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return next();
        }

        // Verify token if present
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
            // Continue regardless of token validity
            next();
        });
    } catch (error) {
        console.error('Optional auth middleware error:', error);
        // Don't fail, just continue without user info
        next();
    }
};

/**
 * Check if current user can access their own resource or admin can access any
 * @param {string} userIdParam - Parameter name for user ID in request
 * @returns {Function} Middleware function
 */
export const checkOwnershipOrAdmin = (userIdParam = 'userId') => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ 
                    message: 'User not authenticated',
                    error: 'USER_NOT_AUTHENTICATED'
                });
            }

            const requestedUserId = parseInt(req.params[userIdParam]);
            const currentUserId = req.user.id;
            const currentUserRole = req.user.role;

            // Admin can access any resource
            if (currentUserRole === 'admin') {
                return next();
            }

            // User can only access their own resource
            if (currentUserId === requestedUserId) {
                return next();
            }

            return res.status(403).json({ 
                message: 'Access denied. You can only access your own resources.',
                error: 'ACCESS_DENIED'
            });
        } catch (error) {
            console.error('Ownership check middleware error:', error);
            res.status(500).json({ 
                message: 'Internal server error',
                error: 'SERVER_ERROR'
            });
        }
    };
};

// Export all middleware functions as a default object
export default {
    authenticateJWT,
    authorizeRoles,
    adminOnly,
    userOrAdmin,
    optionalAuth,
    checkOwnershipOrAdmin
};
