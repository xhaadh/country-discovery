import React from 'react';

interface CountryComparisonProps {
  countries: any[];
}

const CountryComparison: React.FC<CountryComparisonProps> = ({ countries }) => {
  const [country1, country2] = countries;

  // Safely access properties with optional chaining
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Comparison Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Country 1 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-center mb-4">
            <img 
              src={country1.flags?.png} 
              alt={`${country1.name?.common} flag`} 
              className="h-32 w-auto object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-center mb-4">
            {country1.name?.common || 'Unknown Country'}
          </h3>
          
          <div className="space-y-2">
            <p><span className="font-semibold">Official Name:</span> {country1.name?.official || 'N/A'}</p>
            <p><span className="font-semibold">Region:</span> {country1.region || 'N/A'}</p>
            <p><span className="font-semibold">Population:</span> {country1.population?.toLocaleString() || 'N/A'}</p>
            <p><span className="font-semibold">Area:</span> {country1.area?.toLocaleString() || 'N/A'} km²</p>
            <p><span className="font-semibold">Capital:</span> {country1.capital?.join(', ') || 'N/A'}</p>
            <p><span className="font-semibold">Timezones:</span> {country1.timezones?.join(', ') || 'N/A'}</p>
          </div>
        </div>
        
        {/* Country 2 */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-center mb-4">
            <img 
              src={country2.flags?.png} 
              alt={`${country2.name?.common} flag`} 
              className="h-32 w-auto object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-center mb-4">
            {country2.name?.common || 'Unknown Country'}
          </h3>
          
          <div className="space-y-2">
            <p><span className="font-semibold">Official Name:</span> {country2.name?.official || 'N/A'}</p>
            <p><span className="font-semibold">Region:</span> {country2.region || 'N/A'}</p>
            <p><span className="font-semibold">Population:</span> {country2.population?.toLocaleString() || 'N/A'}</p>
            <p><span className="font-semibold">Area:</span> {country2.area?.toLocaleString() || 'N/A'} km²</p>
            <p><span className="font-semibold">Capital:</span> {country2.capital?.join(', ') || 'N/A'}</p>
            <p><span className="font-semibold">Timezones:</span> {country2.timezones?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryComparison;