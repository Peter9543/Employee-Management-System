import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeservice.js';
import { Link } from 'react-router-dom';

export default function EmployeeList(){
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

 
  const fetch = async (search='') => {
    setLoading(true);
    try {
      const data = await getEmployees(search);
      setEmployees(data);
    } catch (err) {
      alert('Could not fetch employees: ' + (err.response?.data?.message || err.message));
    } finally { setLoading(false); }
  };

    useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetch(q);
    }, 300);
    
    return () => clearTimeout(delayDebounce);
  }, [q]);

  const onSearch = (e) => {
    e.preventDefault();
    fetch(q);
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      // optimistic refresh
      setEmployees(prev => prev.filter(e => e._id !== id));
      alert('Deleted successfully');
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name/department/position" className="border p-2 rounded w-full" />
        <button className="bg-blue-600 text-white px-4 rounded">Search</button>
      </form>

      {loading ? <div>Loading...</div> : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Position</th>
                <th className="p-2 text-left">Department</th>
                <th className="p-2 text-right">Salary</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id} className="border-t">
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.position}</td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2 text-right">₹{emp.salary}</td>
                  <td className="p-2 space-x-2">
                    <Link to={`/edit/${emp._id}`} className="px-3 py-1 bg-yellow-400 rounded">Edit</Link>
                    <button onClick={()=>onDelete(emp._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center">No employees found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
