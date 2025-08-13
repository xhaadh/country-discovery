import React, { useState, useEffect } from 'react';
import { fetchCountryByCode } from '../features/country/countryService';
import CountryComparison from '../components/country/CountryComparison';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ComparisonPage: React.FC = () => {
  const [country1, setCountry1] = useState<string>('');
  const [country2, setCountry2] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);

  useEffect(() => {
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
    <div className="bg-[#F9F7F3] rounded-2xl mt-4">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition-all border border-gray-200 text-gray-700 hover:text-gray-900 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-700 transition-colors" />
          <span className="font-medium">Back to all countries</span>
        </Link>

        <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Compare Countries</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select First Country
              </label>
              <select
                value={country1}
                onChange={(e) => setCountry1(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#F4F1EC] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
                disabled={loading}
              >
                <option value="">Choose a country</option>
                {countryOptions.map((country) => (
                  <option key={country.cca3} value={country.cca3}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>

            {/* Country 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Second Country
              </label>
              <select
                value={country2}
                onChange={(e) => setCountry2(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#F4F1EC] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
                disabled={loading}
              >
                <option value="">Choose a country</option>
                {countryOptions.map((country) => (
                  <option key={country.cca3} value={country.cca3}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4">
              <ErrorMessage message={error} />
            </div>
          )}

          <button
            onClick={handleCompare}
            disabled={loading}
            className={`mt-6 px-6 py-3 rounded-full font-medium shadow transition-all cursor-pointer ${
              loading
                ? 'bg-gray-700/60 text-white cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-700 text-white'
            }`}
          >
            {loading ? 'Loading...' : 'Compare Countries'}
          </button>
        </div>

        {/* Results */}
        {selectedCountries.length === 2 && (
          <CountryComparison countries={selectedCountries} />
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
