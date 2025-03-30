import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js'; // or { connectDB } if named export
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
console.log("menuRoutes");
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// Properly handle the database connection before starting server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});