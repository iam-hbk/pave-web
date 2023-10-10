
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


export function encryptTheQrCode(str: string, ): string {
  return str.split('').map(char => {
      let code = char.charCodeAt(0);

      // Encrypt uppercase letters
      if (code >= 65 && code <= 90) {
          return String.fromCharCode((code - 65 + 5) % 26 + 65);
      }

      // Encrypt lowercase letters
      if (code >= 97 && code <= 122) {
          return String.fromCharCode((code - 97 + 5) % 26 + 97);
      }

      // Return other characters unchanged
      return char;
  }).join('');
}