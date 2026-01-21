// import { AppLocation } from "@/types/location";

import { AppLocation } from "@/src/types/next-auth";
import { buildLabel } from "@/lib/locationLabelBuilder";

export async function reverseGeocodeOSM(
  lat: number,
  lng: number
): Promise<AppLocation> {
  const res = await fetch(
    `/api/location/reverse?lat=${lat}&lon=${lng}`,
    {
      headers: {
        "User-Agent": "your-app-name",
      },
    }
  );

 const data = await res.json();
  const addr = data.address || {};

  return {
    label: buildLabel([
      addr.village,
      addr.town,
      addr.city,
      addr.suburb,
      addr.state,
    ]),
    address: data.display_name,
    lat,
    lng,
    city: addr.city || addr.town || addr.village,
    state: addr.state,
    pincode: addr.postcode,
  };
}
