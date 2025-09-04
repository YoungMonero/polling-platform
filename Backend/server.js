import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Polling App</h1>');
});

app.use('/api/auth', authRoutes);

// Database connection + sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully');

    await sequelize.sync({ alter: true }); // keeps schema in sync
    console.log(' Database synced');

    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
})();
