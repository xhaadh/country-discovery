import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCountry, resetCountry } from '../features/country/countrySlice';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import CountryDetail from '../components/country/CountryDetail';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const DetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { code } = useParams<{ code: string }>();
  const { currentCountry, status, error } = useAppSelector((state) => state.country);

  useEffect(() => {
    if (code) {
      dispatch(getCountry(code));
    }
    return () => {
      dispatch(resetCountry());
    };
  }, [code, dispatch]);

  if (status === 'loading' && !currentCountry) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!currentCountry) {
    return <ErrorMessage message="Country not found" />;
  }

  return (
    <div className="min-h-screen py-8 ">
      <div className="container mx-auto px-4 space-y-6 max-w-7xl">
        
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow hover:shadow-md transition-all border border-gray-200 text-gray-700 hover:text-gray-700 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-700 transition-colors" />
          <span className="font-medium">Back to all countries</span>
        </Link>

        {status === 'loading' && !currentCountry && <Loader />}
        {error && <ErrorMessage message={error} />}
        {currentCountry && <CountryDetail country={currentCountry} />}
      </div>
    </div>
  );
};

export default DetailPage;
