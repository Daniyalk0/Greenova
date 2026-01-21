export function buildLabel(parts: (string | undefined)[]) {
  const label = parts.filter(Boolean).join(", ");
  return label || "Selected location";
}
