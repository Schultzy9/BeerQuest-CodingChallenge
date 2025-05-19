import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  it('renders input fields and button', () => {
    render(<FilterPanel onFilter={jest.fn()} />);
    expect(screen.getByPlaceholderText(/filter by name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/filter by city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });

  it('calls onFilter with input values when Go is clicked', () => {
    const onFilter = jest.fn();
    render(<FilterPanel onFilter={onFilter} />);
    fireEvent.change(screen.getByPlaceholderText(/filter by name/i), { target: { value: 'Lager' } });
    fireEvent.change(screen.getByPlaceholderText(/filter by city/i), { target: { value: 'Chicago' } });
    fireEvent.click(screen.getByRole('button', { name: /go/i }));
    expect(onFilter).toHaveBeenCalledWith('Lager', 'Chicago');
  });
});
