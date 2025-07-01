// ❌ Do NOT use 'use client'
import ProductDetails from "../../../../components/ProductDetails";

interface PageProps {
  params: {
    id: string;
  };
}

// ✅ MUST be a regular function, NOT React.FC
export default function Page({ params }: PageProps) {
  return (
    <div>
      <ProductDetails id={params.id} />
    </div>
  );
}
