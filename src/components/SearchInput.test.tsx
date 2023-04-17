import { render, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput component', () => {
  test('should render an input with the passed placeholder text', () => {
    const placeholder = 'Search...';
    const { getByPlaceholderText } = render(<SearchInput onFilterChange={() => {}} placeholder={placeholder} />);
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test('should debounce input changes by 500ms', () => {
    jest.useFakeTimers();
    const onFilterChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchInput onFilterChange={onFilterChange} placeholder="Search..." />);
    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'e' } });
    jest.advanceTimersByTime(250);
    fireEvent.change(input, { target: { value: 'ex' } });
    jest.advanceTimersByTime(500);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
