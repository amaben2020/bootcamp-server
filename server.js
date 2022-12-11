import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Ok');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
