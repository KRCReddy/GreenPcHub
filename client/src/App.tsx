import React from 'react';
import { Router, Link } from 'wouter';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export function App(){
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-5xl mx-auto p-4 flex justify-between">
            <Link href="/"><h1 className="font-bold text-xl">LaptopHub</h1></Link>
            <nav><Link href="/admin/login">Admin</Link></nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-4">
          <Home path="/" />
          <ProductPage path="/product/:id" />
          <AdminLogin path="/admin/login" />
          <AdminDashboard path="/admin" />
        </main>
      </div>
    </Router>
  );
}
