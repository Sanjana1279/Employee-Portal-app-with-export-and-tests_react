import React from 'react';

export default function EmployeeList({ employees, onRemove }) {
  if (!employees.length) return <div className="empty-msg">No employees found.</div>;

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Expected Salary (₹)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, idx) => (
          <tr key={emp.id}>
            <td>{idx + 1}</td>
            <td>{emp.name}</td>
            <td>{emp.username}</td>
            <td>{emp.salary.toLocaleString()}</td>
            <td><button onClick={() => onRemove(emp.id)} className="btn-remove">Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
