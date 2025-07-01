'use client';

import React from 'react';
import ProductDetails from '../../../../components/ProductDetails';

const Page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default Page;
