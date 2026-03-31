
import { prisma } from '@/lib/prisma';
import Home from './(homePage)/Home';
import { Suspense } from 'react';
import SeasonalSkeleton from '@/components/ui/loadingSkeletons/SeasonalSkeleton';
// import { fetchProducts } from '../store/productsSlice';

const Page = async () => {

  return <main>


      <Home />

  </main>
};

export default Page;
