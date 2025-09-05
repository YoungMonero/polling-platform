import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ 
                message: 'Authorization header missing',
                error: 'AUTHORIZATION_MISSING'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: 'Token missing',
                error: 'TOKEN_MISSING'
            });
        }

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
 * Middleware to authorize roles
 * @param {string|Array<string>} allowedRoles - Single role or array of allowed roles
 * @returns {Function} Middleware function
 */
export const authorizeRoles = (allowedRoles) => {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ 
                    message: 'User not authenticated',
                    error: 'USER_NOT_AUTHENTICATED'
                });
            }

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

// Shortcuts for role-based access
export const adminOnly = authorizeRoles(['admin']);
export const userOrAdmin = authorizeRoles(['user', 'admin']);

/**
 * Middleware for optional authentication
 * If token exists and is valid, req.user is set. Otherwise, continue.
 */
export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return next();
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
            next();
        });
    } catch (error) {
        console.error('Optional auth middleware error:', error);
        next();
    }
};

/**
 * Middleware to check resource ownership or admin access
 * @param {string} userIdParam - The request parameter containing the user ID
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
