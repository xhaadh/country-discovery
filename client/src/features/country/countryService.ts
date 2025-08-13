import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export interface FetchCountriesParams {
  page?: number;
  limit?: number;
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
  fields?: string;
}

export const fetchCountries = async (params: FetchCountriesParams = {}) => {
  const response = await axios.get(`${API_BASE}/countries`, { params });
  return response.data;
};

export const fetchCountryByCode = async (code: string) => {
  const response = await axios.get(`${API_BASE}/countries/${code}`);
  return response.data;
};

export const fetchCountriesByRegion = async (region: string, params: Omit<FetchCountriesParams, 'region'> = {}) => {
  const response = await axios.get(`${API_BASE}/countries/region/${region}`, { params });
  return response.data;
};

export const searchCountries = async (params: FetchCountriesParams = {}) => {
  const response = await axios.get(`${API_BASE}/countries/search`, { params });
  return response.data;
};