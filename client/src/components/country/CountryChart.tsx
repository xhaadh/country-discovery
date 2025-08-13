import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Country } from '../../features/country/countrySlice';

interface CountryChartProps {
  countries: Country[];
}

const CountryChart: React.FC<CountryChartProps> = ({ countries }) => {
  const data = countries.map(country => ({
    name: country.name.common,
    population: country.population,
    area: country.area || 0
  }));

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Bar dataKey="population" fill="#8884d8" name="Population" />
          <Bar dataKey="area" fill="#82ca9d" name="Area (km²)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryChart;