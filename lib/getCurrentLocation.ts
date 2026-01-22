export type LocationErrorType =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNKNOWN";

export function getCurrentLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ type: "UNKNOWN", message: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject({
              type: "PERMISSION_DENIED",
              message: "Location permission denied",
            });
            break;

          case error.POSITION_UNAVAILABLE:
            reject({
              type: "POSITION_UNAVAILABLE",
              message: "Location unavailable",
            });
            break;

          case error.TIMEOUT:
            reject({
              type: "TIMEOUT",
              message: "Location request timed out",
            });
            break;

          default:
            reject({
              type: "UNKNOWN",
              message: "Unable to fetch location",
            });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
}
