import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import productsRouter from './routes/products.js';
import inquiriesRouter from './routes/inquiries.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/inquiries', inquiriesRouter);

// serve static
const publicDir = path.join(process.cwd(), 'dist', 'public');
app.use(express.static(publicDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const port = process.env.PORT || 5000;
initDb(); // ensure DB and seed
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
