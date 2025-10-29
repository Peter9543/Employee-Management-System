import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">Employee Management</Link>
          <Link to="/add" className="bg-blue-600 text-white px-3 py-1 rounded">Add Employee</Link>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </main>
    </div>
  );
}
