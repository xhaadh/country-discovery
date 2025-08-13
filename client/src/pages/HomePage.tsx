import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadCountries,
  incrementPage,
  setRegionFilter,
  setTimezoneFilter,
  setSearchQuery,
} from "../features/country/countrySlice";
import CountryCard from "../components/country/CountryCard";
import SearchBar from "../components/ui/SearchBar";
import FilterSelect from "../components/ui/FilterSelect";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import InfiniteScrollTrigger from "../components/ui/InfiniteScrollTrigger";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    list: countries,
    status,
    error,
    hasMore,
    filters,
    page,
    limit, 
  } = useAppSelector((state) => state.country);

  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch, filters]);

    useEffect(() => {
    dispatch(loadCountries({ 
      page, 
      limit,
      ...filters 
    }));
  }, [dispatch, filters, page, limit]);

  const handleLoadMore = () => {
    if (hasMore && status !== "loading") {
      dispatch(incrementPage());
    }
  };

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleRegionChange = (value: string) => {
    dispatch(setRegionFilter(value));
  };

  const handleTimezoneChange = (value: string) => {
    dispatch(setTimezoneFilter(value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-2">
          <SearchBar
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search by name or capital..."
          />
        </div>
        <div>
          <FilterSelect
            value={filters.region}
            onChange={handleRegionChange}
            options={regions}
            placeholder="All Regions"
          />
        </div>
        <div>
          <input
            type="text"
            value={filters.timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            placeholder="Enter timezone"
            className="w-full p-3 rounded-lg bg-[#F4F1EC] border border-gray-200 focus:border-gray-700 focus:ring-2 focus:ring-gray-700 outline-none"
          />
        </div>
      </div>

      {status === "loading" && countries.length === 0 && <Loader />}

      {error && <ErrorMessage message={error} />}

      {countries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>

          {status === "loading" && countries.length > 0 && (
            <div className="flex justify-center my-8">
              <Loader />
            </div>
          )}

          <InfiniteScrollTrigger
            onTrigger={handleLoadMore}
            disabled={!hasMore || status === "loading"}
          />

          {!hasMore && countries.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              No more countries to load
            </div>
          )}
        </>
      ) : (
        status !== "loading" &&
        !error && (
          <div className="text-center py-12 text-gray-500">
            No countries found matching your criteria
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;
