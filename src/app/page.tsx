'use client';

import React, { useEffect } from 'react';
import Home from './(homePage)/Home';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { AppDispatch } from '../store/store';

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(fetchProducts);
    
  }, [dispatch]);

  return <Home />;
};

export default Page;
