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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
  <Link to={`/country/${country.cca3}`}>
    <div className="relative">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3 bg-[#4CAF50]/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
        {currentTime}
      </div>
    </div>
  </Link>

  <div className="p-5">
    <Link to={`/country/${country.cca3}`}>
      <h3 className="text-lg font-semibold truncate text-gray-800 hover:text-[#FF7A59] transition-colors">
        {country.name.common}
      </h3>
    </Link>
    <p className="text-sm text-gray-500">{country.region}</p>

    <div className="mt-4 flex justify-between text-sm">
      <div>
        <p className="text-gray-400">Population</p>
        <p className="font-medium">{country.population.toLocaleString()}</p>
      </div>
    </div>
  </div>
</div>
  );
};

export default CountryCard;
