// src/components/country/CountryDetail.tsx
import React from 'react';
import CountryMap from './CountryMap';
import CountryChart from './CountryChart';
import { Country } from '../../features/country/countrySlice';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-6 flex flex-col items-center">
          <img 
            src={country.flags.png} 
            alt={`${country.name.common} flag`} 
            className="w-full max-w-xs h-auto object-contain mb-6"
          />
          <h1 className="text-3xl font-bold text-center">{country.name.common}</h1>
          <h2 className="text-xl text-gray-600 text-center">{country.name.official}</h2>
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Subregion:</span> {country.subregion}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Area:</span> {country.area?.toLocaleString()} km²</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.join(', ')}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Time & Location</h3>
              <p><span className="font-semibold">Timezones:</span> {country.timezones?.join(', ')}</p>
              <p><span className="font-semibold">Coordinates:</span> {country.latlng?.join(', ')}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Location Map</h3>
            <div className="h-96 w-full rounded-lg overflow-hidden">
              <CountryMap 
                position={country.latlng || [0, 0]} 
                countryName={country.name.common}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <CountryChart countries={[country]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;