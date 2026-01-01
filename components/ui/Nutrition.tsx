const Nutrition = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 rounded-xl p-2 text-center">
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);
export default Nutrition;