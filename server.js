import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/bootcampRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

connectDB();
console.log(connectDB);
const PORT = process.env.PORT || 3000;
const app = express();

//Middleware: allows us to ensure req.body accepts json
app.use(express.json());

//ROUTES:
app.use('/api/v1/bootcamps', router);

//Error Handler: Last middleware is the error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
