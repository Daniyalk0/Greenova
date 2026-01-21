// import { AppLocation } from "@/types/location";

import { AppLocation } from "@/src/types/next-auth";
import { buildLabel } from "./locationLabelBuilder";

export function formatOSMPlace(place: any): AppLocation {
  const addr = place.address || {};

 return {
    label: buildLabel([
      place.name,
      addr.village,
      addr.town,
      addr.city,
      addr.state,
    ]),
    address: place.display_name,
    lat: Number(place.lat),
    lng: Number(place.lon),
    city: addr.city || addr.town || addr.village,
    state: addr.state,
    pincode: addr.postcode,
  };
}
