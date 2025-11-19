import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';

export default function ProductPage(){
  const [match, params] = useRoute('/product/:id');
  const [product, setProduct] = useState<any|null>(null);
  useEffect(()=>{ if(params?.id) fetch('/api/products/'+params.id).then(r=>r.json()).then(d=>setProduct(d)) },[params]);
  if(!product) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{product.brand} {product.model}</h2>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
