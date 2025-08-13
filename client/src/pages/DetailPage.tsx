// src/pages/DetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCountry, resetCountry } from '../features/country/countrySlice';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import CountryDetail from '../components/country/CountryDetail';

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
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        &larr; Back to Home
      </Link>
      
      <CountryDetail country={currentCountry} />
    </div>
  );
};

export default DetailPage;