import React, { useEffect, useState } from 'react';

export default function AdminDashboard(){
  const [products, setProducts] = useState<any[]>([]);
  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d.products)) },[]);
  const token = localStorage.getItem('admin_token') || '';
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  const add = async ()=> {
    const body = { brand:'New', model:'New', price:1000, ram_gb:4, storage_type:'SSD', storage_gb:128, cpu:'i3', purpose:'Office', screen_in:14, gpu:'', images:[], description:'New' };
    await fetch('/api/products', { method:'POST', headers: {'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(body) });
    const res = await fetch('/api/products'); const d = await res.json(); setProducts(d.products);
  };
  const del = async (id:number)=> { await fetch('/api/products/'+id, { method:'DELETE', headers: { Authorization:`Bearer ${token}` } }); setProducts(products.filter(p=>p.id!==id)); };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin</h2>
      <button onClick={add} className="bg-green-600 text-white px-3 py-1 rounded mb-4">Add sample</button>
      <div className="space-y-3">
        {products.map(p=>(
          <div key={p.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{p.brand} {p.model}</div>
              <div>₹{p.price}</div>
            </div>
            <div>
              <button onClick={()=>del(p.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
