import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeList from '../src/components/EmployeeList';

const dummyData = [
  { id: 1, name: 'Name1', username: 'user1', salary: 1000 },
  { id: 2, name: 'Name2', username: 'user2', salary: 2000 },
];

describe('EmployeeList', () => {
  test('renders employees and remove button works', async () => {
    const mockRemove = jest.fn();
    render(<EmployeeList employees={dummyData} onRemove={mockRemove} />);
    expect(screen.getByText('Name1')).toBeInTheDocument();
    const removeButtons = screen.getAllByText(/Remove/i);
    expect(removeButtons.length).toBe(dummyData.length);
    await userEvent.click(removeButtons[0]);
    expect(mockRemove).toHaveBeenCalledWith(dummyData[0].id);
  });

  test('shows no employees found message', () => {
    render(<EmployeeList employees={[]} onRemove={() => {}} />);
    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });
});
