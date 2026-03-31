export default function InfoCard({
  label,
  value,
  large = false,
}: {
  label: string;
  value: React.ReactNode;
  large?: boolean;
}) {
 const normalized = typeof value === "string"
    ? value.trim().toLowerCase()
    : "";

  const showBadge =
    normalized === "admin" || normalized === "customer";


  return (
    <div className="bg-gray-50 border rounded-lg p-3">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1 font-dmsans_light">
        {label}
      </p>

    
      {showBadge ? (
        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-dmsans_semibold -translate-x-2">
          {normalized === "admin" ? "Admin" : "Customer"}
        </span>
      ) : (
        <p
          className={`${
            large ? "text-xl font-bold" : "text-sm font-medium"
          } font-dmsans_semibold`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
