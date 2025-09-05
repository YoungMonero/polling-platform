import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authService } from '../services/authService.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// ------------------------ LOGIN ------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        error: 'VALIDATION_ERROR'
      });
    }

    // Authenticate user
    const authResult = await authService.authenticateUser(email, password);

    if (!authResult.success) {
      return res.status(403).json({ 
        message: authResult.message,
        error: 'AUTHENTICATION_FAILED'
      });
    }

    const { user } = authResult;

    // Payload includes id, name, email, and role
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Sign JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      message: 'Login successful',
      token,
      user // full user object
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: 'SERVER_ERROR'
    });
  }
};

// ------------------------ GET CURRENT USER ------------------------
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await authService.getUserById(userId);

    if (!user.success) {
      return res.status(404).json({ 
        message: user.message,
        error: 'USER_NOT_FOUND'
      });
    }

    res.json(user.data); // returns full user info
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: 'SERVER_ERROR'
    });
  }
};

// ------------------------ REGISTER ------------------------
export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required',
        error: 'VALIDATION_ERROR'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long',
        error: 'VALIDATION_ERROR'
      });
    }

    // Create user
    const createResult = await authService.createUser(name, email, password, role);

    if (!createResult.success) {
      return res.status(400).json({ 
        message: createResult.message,
        error: 'USER_CREATION_FAILED'
      });
    }

    res.status(201).json({ 
      message: 'User created successfully',
      user: createResult.data // full user object
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: 'SERVER_ERROR'
    });
  }
};

// ------------------------ LOGOUT ------------------------
export const logout = async (req, res) => {
  try {
    // Client should remove token; optionally blacklist token on server
    res.json({ 
      message: 'Logout successful. Please remove the token from client storage.',
      success: true
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: 'SERVER_ERROR'
    });
  }
};
