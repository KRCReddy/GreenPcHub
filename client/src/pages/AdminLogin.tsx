import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function AdminLogin(){
  const [pass,setPass]=useState('');
  const [,setLoc]=useLocation();
  const submit=()=>{ localStorage.setItem('admin_token',pass); setLoc('/admin'); };
  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">Admin Login</h2>
      <input value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-2 border mb-2" placeholder="Admin password" />
      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      <p className="mt-2 text-sm text-gray-500">Use the password you set in deployment env as admin token.</p>
    </div>
  );
}
