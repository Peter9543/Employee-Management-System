import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const getEmployees = (q) => api.get('/employees', { params: { q } }).then(r => r.data);
console.log("getEmployees",getEmployees)
export const getEmployee = (id) => api.get(`/employees/${id}`).then(r => r.data);
export const createEmployee = (payload) => api.post('/employees', payload).then(r => r.data);
export const updateEmployee = (id, payload) => api.put(`/employees/${id}`, payload).then(r => r.data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then(r => r.data);
