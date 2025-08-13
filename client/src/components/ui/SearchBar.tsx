import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search...' 
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
  <input
    type="text"
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    className="w-full p-3 pl-12 rounded-lg bg-[#F4F1EC] border border-gray-200 focus:border-gray-700 focus:ring-2 focus:ring-gray-700 outline-none"
  />
  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
</div>
  );
};

export default SearchBar;