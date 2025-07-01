
import React from 'react';
import ProductDetails from '../../../../components/ProductDetails';

// Type the params correctly
interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default Page;
