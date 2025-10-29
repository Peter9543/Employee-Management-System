import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../api/employeeservice.js';
import { useNavigate, useParams } from 'react-router-dom';

const initial = { name:'', email:'', position:'', department:'', salary:'' };

export default function EmployeeForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (id) {
      setLoading(true);
      getEmployee(id)
        .then(data => setForm({ ...data, salary: data.salary }))
        .catch(err => alert('Error fetching: ' + (err.response?.data?.message || err.message)))
        .finally(()=> setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // basic client validation
    if (!form.name || !form.email || !form.position || !form.department || form.salary === '') {
      return alert('Please fill all fields');
    }
    try {
      if (id) {
        await updateEmployee(id, form);
        alert('Updated successfully');
      } else {
        await createEmployee(form);
        alert('Created successfully');
      }
      navigate('/');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'Add'} Employee</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
        <input name="position" value={form.position} onChange={handleChange} placeholder="Position" className="w-full border p-2 rounded" />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="w-full border p-2 rounded" />
        <input name="salary" type="number" value={form.salary} onChange={handleChange} placeholder="Salary" className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded">{id ? 'Update' : 'Create'}</button>
          <button type="button" onClick={() => navigate('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
