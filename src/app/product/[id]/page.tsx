import ProductDetails from "../../../../components/ProductDetails";

// ✅ No React.FC, no interface
export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetails id={params.id} />;
}
