// src/components/country/CountryCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Country } from "../../features/country/countrySlice";
import { formatTime } from "../../utils/timeUtils";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const currentTime = formatTime(country.timezones[0]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/country/${country.cca3}`}>
        <div className="relative">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
            {currentTime}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/country/${country.cca3}`}>
          <h3 className="text-xl font-bold truncate hover:text-blue-600 transition-colors">
            {country.name.common}
          </h3>
        </Link>
        <p className="text-gray-600">{country.region}</p>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Population</p>
            <p>{country.population.toLocaleString()}</p>
          </div>

          {/* <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCompare(country.cca3);
            }}
            disabled={isComparing}
            className={`px-4 py-2 rounded-lg ${
              isComparing 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Compare
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
