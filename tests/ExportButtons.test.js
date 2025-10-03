// tests/ExportButtons.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExportButtons from '../src/components/ExportButtons';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';
// --- Mock XLSX ---
jest.mock('xlsx', () => ({
  utils: {
    json_to_sheet: jest.fn(),
    book_new: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));
// --- Mock jsPDF ---
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    save: jest.fn(),
  }));
});
// --- Mock jspdf-autotable ---
jest.mock('jspdf-autotable', () => jest.fn());
// --- Mock CSVLink so it renders as a button for testing ---
jest.mock('react-csv', () => ({
  CSVLink: ({ children, ...props }) => (
    <a href={props.data && props.filename ? `data:text/csv` : '#'}>{children}</a>
  ),
}));
// --- Dummy Data ---
const dummyData = [
  { id: 1, name: 'A', username: 'a', salary: 100 },
  { id: 2, name: 'B', username: 'b', salary: 200 },
];
describe('ExportButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders all buttons and they are clickable', async () => {
    render(<ExportButtons data={dummyData} />);
    const excelBtn = screen.getByText(/Export Excel/i);
    const pdfBtn = screen.getByText(/Export PDF/i);
    const csvBtn = screen.getByText(/Export CSV/i);
    await userEvent.click(excelBtn);
    await userEvent.click(pdfBtn);
    await userEvent.click(csvBtn);
    expect(excelBtn).toBeInTheDocument();
    expect(pdfBtn).toBeInTheDocument();
    expect(csvBtn).toBeInTheDocument();
  });
  test('handles empty data without errors', async () => {
    render(<ExportButtons data={[]} />);
    await userEvent.click(screen.getByText(/Export Excel/i));
    await userEvent.click(screen.getByText(/Export PDF/i));
    await userEvent.click(screen.getByText(/Export CSV/i));
    expect(screen.getByText(/Export Excel/i)).toBeInTheDocument();
  });
  test('CSVLink contains correct CSV data', () => {
    render(<ExportButtons data={dummyData} />);
    const csvLink = screen.getByText(/Export CSV/i);
    expect(csvLink.getAttribute('href')).toContain('data:text/csv');
  });
  test('Excel and PDF export functions are called', async () => {
    render(<ExportButtons data={dummyData} />);
    const excelBtn = screen.getByText(/Export Excel/i);
    const pdfBtn = screen.getByText(/Export PDF/i);
    await userEvent.click(excelBtn);
    await userEvent.click(pdfBtn);
    // --- XLSX check ---
    const XLSX = require('xlsx');
    expect(XLSX.writeFile).toHaveBeenCalled();
    // --- jsPDF check ---
    const jsPDF = require('jspdf');
    const instance = jsPDF.mock.instances[0];
    expect(instance.text).toHaveBeenCalled();
    expect(instance.save).toHaveBeenCalled();
    // --- autoTable check ---
    expect(autoTable).toHaveBeenCalled();
  });
});

