import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'laptops.db');

export function initDb(){
  const dir = path.dirname(DB_PATH);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const db = new Database(DB_PATH);
  // create tables if not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT,
      model TEXT,
      price INTEGER,
      ram_gb INTEGER,
      storage_type TEXT,
      storage_gb INTEGER,
      cpu TEXT,
      purpose TEXT,
      screen_in REAL,
      gpu TEXT,
      images TEXT,
      description TEXT,
      availability INTEGER DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      email TEXT,
      message TEXT,
      product_ids TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // seed if empty
  const row = db.prepare('SELECT COUNT(*) as c FROM products').get() as unknown;
  // safely extract count with runtime checking
  const count = (row && typeof (row as any).c === 'number') ? (row as any).c : 0;

  if(count === 0){
    const insert = db.prepare('INSERT INTO products (brand, model, price, ram_gb, storage_type, storage_gb, cpu, purpose, screen_in, gpu, images, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
    insert.run('ExampleBrand','Model A',49999,8,'SSD',512,'Intel i5','Office,Student',15.6,'',JSON.stringify([]),'A sample laptop');
    insert.run('GameTech','Gamer X',79999,16,'SSD',1024,'Intel i7','Gaming',17,'NVIDIA RTX 3060',JSON.stringify([]),'High performance laptop');
  }
  db.close();
}
export function getDb(){
  return new Database(DB_PATH, { verbose: console.log });
}
