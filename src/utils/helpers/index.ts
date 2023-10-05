// helpers.ts

export async function getCurrentLongLat(): Promise<{
  lat: number;
  long: number;
} | null> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: long } = position.coords;
          resolve({ lat, long });
        },
        (err) => {
          console.error(err);
          resolve(null); // Resolve with null if there is an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      resolve(null); // Resolve with null if geolocation is not supported
    }
  });
}
