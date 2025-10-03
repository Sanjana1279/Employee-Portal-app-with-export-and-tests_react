import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExportButtons({ data }) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee List", 14, 20);
    autoTable(doc, {
      head: [['#', 'Name', 'Username', 'Expected Salary']],
      body: data.map((emp, idx) => [idx + 1, emp.name, emp.username, emp.salary]),
    });
    doc.save("employees.pdf");
  };

  const csvData = [
    ['id', 'name', 'username', 'salary'],
    ...data.map(emp => [emp.id, emp.name, emp.username, emp.salary])
  ];

  return (
    <div className="export-buttons">
      <button onClick={exportExcel} className="btn-export">Export Excel</button>
      <button onClick={exportPDF} className="btn-export">Export PDF</button>
      <CSVLink data={csvData} filename="employees.csv" className="btn-export">
        Export CSV
      </CSVLink>
    </div>
  );
}
