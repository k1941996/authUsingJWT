import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from '#config/dbConfig.js';
import routes from '#routes/index.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
