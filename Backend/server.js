import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import sequelize  from './src/config/sequelize.js'; // import sequelize

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
import authRoutes from './src/routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('<h1>Polling App</h1>');
});

// Start server after DB is ready
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log(' Database synced');

    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1);
  }
})();
