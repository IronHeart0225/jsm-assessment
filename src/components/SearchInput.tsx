import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../hooks/useDebounce';

interface SearchInputProps {
  onFilterChange: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onFilterChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    onFilterChange(debouncedInputValue);
  }, [debouncedInputValue, onFilterChange]);

  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

SearchInput.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
