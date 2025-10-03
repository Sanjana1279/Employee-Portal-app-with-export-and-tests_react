import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('App', () => {
  test('renders Employee Portal heading', () => {
    render(<App />);
    expect(screen.getByText(/employee portal/i)).toBeInTheDocument();
  });

  test('can add a new employee', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Name'), 'Test User');
    await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    await userEvent.type(screen.getByPlaceholderText('Salary'), '45000');
    await userEvent.click(screen.getByText(/Add Employee/i));

    const newEmployee = await screen.findByText('Test User');
    expect(newEmployee).toBeInTheDocument();
  });

  test('can remove an employee', async () => {
    render(<App />);
    const removeButtons = screen.getAllByText('Remove');
    const initialCount = removeButtons.length;

    await userEvent.click(removeButtons[0]);

    const updatedRemoveButtons = await screen.findAllByText('Remove');
    expect(updatedRemoveButtons.length).toBe(initialCount - 1);
  });

  test('form empty fields triggers alert', async () => {
    render(<App />);
    // Properly mock window.alert before interaction
    window.alert = jest.fn();

    await userEvent.click(screen.getByText(/Add Employee/i));

    expect(window.alert).toHaveBeenCalledWith('All fields are required!');
  });
});
