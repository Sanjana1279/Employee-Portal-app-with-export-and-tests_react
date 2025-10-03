# Employee Portal React App

This is a **React-based Employee Portal** web application that manages employee records. It supports adding, displaying, and removing employee data, along with options to export employee data in **Excel, PDF, and CSV** formats. The project also includes **unit tests** with Jest and React Testing Library.

## Features

- Add employees with name, username, and salary
- Display employee list in a table with remove functionality
- Export employee data as Excel, PDF, and CSV files
- Robust error handling with React Error Boundary
- Responsive and user-friendly UI
 
## **Screenshots**

<img width="1803" height="797" alt="image" src="https://github.com/user-attachments/assets/47c73a75-dbbd-455f-ab52-22ccabb0fa69" />

<img width="1900" height="442" alt="image" src="https://github.com/user-attachments/assets/3422b82c-8d67-4310-8689-7f22de006cc7" />

---

## Tech Stack

- React.js with functional components and hooks
- jsPDF and jsPDF-Autotable for PDF export
- XLSX (SheetJS) for Excel export
- react-csv for CSV export
- Jest and React Testing Library for unit tests

## Installation

1. Install dependencies:

```
npm install

```

2. Start development server:

```
npm start

```

## Running Tests and Coverage

Run unit tests with coverage report:

```
npm run test:coverage
```

Testing involves the current project as well as extensive tests implemented in the [Employee-Portal-app-with-export-and-tests_react](https://github.com/Sanjana1279/Employee-Portal-app-with-export-and-tests_react/tree/main) repository.

## Project Structure

- `src/components`: React components including EmployeeList, ExportButtons, and ErrorBoundary
- `src/App.js`: Main app component managing state and layout
- `tests`: Test files for components and integration

## License

MIT License
```

