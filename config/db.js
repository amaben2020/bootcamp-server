//Handles DB connection

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_CONNECTION;
export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`MongoDB connection successfully created ✅ `);
  } catch (error) {
    console.log(`Error ${error.message} ❌`);
    process.exit(1);
  }
};
