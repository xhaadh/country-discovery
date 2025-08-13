import React from 'react';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ 
  value, 
  onChange, 
  options,
  placeholder = 'Select...'
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-lg bg-[#F4F1EC] border border-gray-200 focus:border-gray-700 focus:ring-2 focus:ring-gray-700 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;