import React from 'react';
import CountryMap from './CountryMap';
import CountryChart from './CountryChart';
import { Country } from '../../features/country/countrySlice';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  return (
    <div className=" rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        
        {/* Left column - Flag & Names */}
        <div className="md:w-1/3 p-6 flex flex-col items-center bg-[#F4F1EC]">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full max-w-xs h-auto object-contain mb-6 rounded-lg shadow-sm"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {country.name.common}
          </h1>
          <h2 className="text-lg text-gray-500 text-center font-medium">
            {country.name.official}
          </h2>
        </div>
        
        {/* Right column - Details */}
        <div className="md:w-2/3 p-6 bg-[#F4F1EC]">
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F9F7F3] p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Subregion:</span> {country.subregion}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Area:</span> {country.area?.toLocaleString()} km²</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.join(', ')}</p>
            </div>
            
            <div className="bg-[#F9F7F3] p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
                Time & Location
              </h3>
              <p><span className="font-semibold">Timezones:</span> {country.timezones?.join(', ')}</p>
              <p><span className="font-semibold">Coordinates:</span> {country.latlng?.join(', ')}</p>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
              Location Map
            </h3>
            <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <CountryMap
                position={country.latlng || [0, 0]}
                countryName={country.name.common}
              />
            </div>
          </div>
          
          {/* Chart Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
              Statistics
            </h3>
            <div className="bg-[#F9F7F3] rounded-lg shadow-sm border border-gray-200 p-4">
              <CountryChart countries={[country]} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
