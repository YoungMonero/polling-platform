import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authService } from '../services/authService.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// ------------------------ LOGIN ------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        error: 'VALIDATION_ERROR'
      });
    }

    const authResult = await authService.authenticateUser(email, password);

    if (!authResult.success) {
      return res.status(403).json({ 
        message: authResult.message,
        error: 'AUTHENTICATION_FAILED'
      });
    }

    const { user } = authResult;
    const payload = { id: user.id, email: user.email, role: user.role };
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

    res.json(user.data);
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
    const { username, email, password, role = 'user' } = req.body; // Changed 'name' to 'username'

    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Username, email, and password are required',
        error: 'VALIDATION_ERROR'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long',
        error: 'VALIDATION_ERROR'
      });
    }

    const createResult = await authService.createUser(username, email, password, role);

    if (!createResult.success) {
      return res.status(400).json({ 
        message: createResult.message,
        error: 'USER_CREATION_FAILED'
      });
    }

    const user = createResult.data;
    // req.io.emit('userRegistered', { username, email }); // Real-time event
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, username, email, role }
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