// app.js
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import sessionRoutes from './src/routes/sessionRoute.js';
import pollRoutes from './src/routes/pollRoutes.js';
import './src/models/index.js'; // Initialize database models

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/polls', pollRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Polling Platform Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root
app.get('/', (req, res) => {
  res.json({ 
    message: 'Polling Platform Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      sessions: '/api/sessions',
      polls: '/api/polls',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    error: 'NOT_FOUND'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: 'SERVER_ERROR'
  });
});

export default app;
