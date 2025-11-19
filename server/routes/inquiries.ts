import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';

const router = express.Router();
const DB_PATH = path.join(process.cwd(), 'data', 'laptops.db');

router.post('/', (req, res) => {
  const db = new Database(DB_PATH);
  const { name, phone, email, message, product_ids } = req.body;
  const stmt = db.prepare('INSERT INTO inquiries (name,phone,email,message,product_ids) VALUES (?,?,?,?,?)');
  const info = stmt.run(name, phone, email, message, JSON.stringify(product_ids||[]));
  db.close();
  res.json({ id: info.lastInsertRowid });
});

router.get('/', (req, res) => {
  const pass = process.env.VITE_ADMIN_PASSWORD || '';
  const auth = req.headers.authorization === `Bearer ${pass}`;
  if(!auth) return res.status(401).json({ message: 'Unauthorized' });
  const db = new Database(DB_PATH, { readonly: true });
  const rows = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  db.close();
  res.json({ inquiries: rows });
});

export default router;
