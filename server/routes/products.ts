import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';

const router = express.Router();
const DB_PATH = path.join(process.cwd(), 'data', 'laptops.db');

router.get('/', (req, res) => {
  const db = new Database(DB_PATH, { readonly: true });
  const rows = db.prepare('SELECT * FROM products').all();
  db.close();
  res.json({ products: rows, total: rows.length });
});

router.get('/:id', (req, res) => {
  const db = new Database(DB_PATH, { readonly: true });
  const row = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id);
  db.close();
  if(!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
});

// admin add product (simple: protect by env password)
router.post('/', (req, res) => {
  const pass = process.env.VITE_ADMIN_PASSWORD || '';
  const auth = req.headers.authorization === `Bearer ${pass}`;
  if(!auth) return res.status(401).json({ message: 'Unauthorized' });
  const db = new Database(DB_PATH);
  const data = req.body;
  const stmt = db.prepare('INSERT INTO products (brand,model,price,ram_gb,storage_type,storage_gb,cpu,purpose,screen_in,gpu,images,description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
  const info = stmt.run(data.brand, data.model, data.price, data.ram_gb, data.storage_type, data.storage_gb, data.cpu, data.purpose, data.screen_in, data.gpu, JSON.stringify(data.images||[]), data.description);
  const id = info.lastInsertRowid;
  db.close();
  res.json({ id });
});

// delete
router.delete('/:id', (req, res) => {
  const pass = process.env.VITE_ADMIN_PASSWORD || '';
  const auth = req.headers.authorization === `Bearer ${pass}`;
  if(!auth) return res.status(401).json({ message: 'Unauthorized' });
  const db = new Database(DB_PATH);
  db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
  db.close();
  res.json({ ok: true });
});

export default router;
