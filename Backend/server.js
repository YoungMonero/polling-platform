import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import SessionRoutes from './src/routes/sessionRoute.js';
import './src/models/index.js'; // Initialize database models

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', SessionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        message: 'Polling Platform Backend is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Polling Platform Backend API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
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

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(` Polling Platform Backend server running on port ${PORT}`);
        console.log(` API Documentation available at http://localhost:${PORT}/api/auth`);
        console.log(` Health check: http://localhost:${PORT}/health`);
    });
}

export default app;
