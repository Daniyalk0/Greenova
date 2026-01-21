export async function searchPlacesOSM(query: string) {
  if (!query || query.length < 2) return [];

  try {
    const res = await fetch(`/api/location/search?q=${query}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
