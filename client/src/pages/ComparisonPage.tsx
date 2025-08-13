import React, { useState, useEffect } from 'react';
import { fetchCountryByCode } from '../features/country/countryService';
import CountryComparison from '../components/country/CountryComparison';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Link } from 'react-router-dom';

const ComparisonPage: React.FC = () => {
  const [country1, setCountry1] = useState<string>('');
  const [country2, setCountry2] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // For comparison loading
  const [error, setError] = useState<string | null>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]); // For dropdown options

  useEffect(() => {
    // Fetch country list for dropdowns
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/countries?fields=cca3,name,flags&limit=250');
        const data = await response.json();
        setCountryOptions(data.items);
        setLoading(false);
      } catch (err) {
        setError('Failed to load countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCompare = async () => {
    if (!country1 || !country2) {
      setError('Please select two countries to compare');
      return;
    }
    
    if (country1 === country2) {
      setError('Please select two different countries');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch full details for both countries
      const [country1Data, country2Data] = await Promise.all([
        fetchCountryByCode(country1),
        fetchCountryByCode(country2)
      ]);
      
      setSelectedCountries([country1Data, country2Data]);
    } catch (err) {
      setError('Failed to fetch country details');
    } finally {
      setLoading(false);
    }
  };

  if (loading && countryOptions.length === 0) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        &larr; Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Compare Countries</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select First Country
            </label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Choose a country</option>
              {countryOptions.map(country => (
                <option key={country.cca3} value={country.cca3}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Second Country
            </label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Choose a country</option>
              {countryOptions.map(country => (
                <option key={country.cca3} value={country.cca3}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <button
          onClick={handleCompare}
          disabled={loading}
          className={`mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg w-full md:w-auto ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {loading ? 'Loading...' : 'Compare Countries'}
        </button>
      </div>
      
      {selectedCountries.length === 2 && (
        <CountryComparison countries={selectedCountries} />
      )}
    </div>
  );
};

export default ComparisonPage;