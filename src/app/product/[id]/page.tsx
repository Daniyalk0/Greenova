
import ProductDetails from "../../../../components/ProductDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}

