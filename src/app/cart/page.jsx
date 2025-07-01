'use client';

import React, { useEffect } from 'react';
import Cart from '../../../components/Cart';
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Cart />
    </div>
  );
};

export default Page;
