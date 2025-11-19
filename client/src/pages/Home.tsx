import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Home(){
  const [products, setProducts] = useState<any[]>([]);
  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d.products)) },[]);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{p.brand} — {p.model}</h3>
            <p>₹{p.price}</p>
            <Link href={'/product/'+p.id}><a className="text-blue-600">View</a></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
