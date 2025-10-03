import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import ExportButtons from './components/ExportButtons';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sanjana K S', username: 'sanjana', salary: 50000 },
    { id: 2, name: 'Rahul Kumar', username: 'rahul', salary: 60000 },
  ]);
  const [form, setForm] = useState({ name: '', username: '', salary: '' });

  const removeEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addEmployee = (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.salary) {
      alert("All fields are required!");
      return;
    }
    const newEmp = { id: Date.now(), name: form.name, username: form.username, salary: Number(form.salary) };
    setEmployees(prev => [...prev, newEmp]);
    setForm({ name: '', username: '', salary: '' });
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Employee Portal</h1>
        <form onSubmit={addEmployee} className="employee-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
          <button type="submit">Add Employee</button>
        </form>
        <ExportButtons data={employees} />
        <EmployeeList employees={employees} onRemove={removeEmployee} />
      </div>
    </ErrorBoundary>
  );
}
