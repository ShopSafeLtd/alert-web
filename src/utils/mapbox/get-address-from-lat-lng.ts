interface Response {
  features: {
    context: {
      id: string;
      text: string;
    }[];
    place_name: string;
  }[];
}

/**
 * Get the address from a lat lng pair.
 * @param {Object} input - An object containing the lat and lng. Both are required.
 * @param {number} input.lat - The latitude.
 * @param {number} input.lng - The longitude.
 * @returns {Promise<{street: string, city: string, postcode: string, lat: number, lng: number}>} Returns an object containing the street, city, postcode, lat, and lng. On error returns empty strings and 0 for lat and lng.
 */
export const getAddressFromLatLng = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<{
  city: string;
  lat: number;
  lng: number;
  postcode: string;
  street: string;
}> => {
  if (!lat || !lng) {
    return {
      city: '',
      lat: 0,
      lng: 0,
      postcode: '',
      street: '',
    };
  }
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
      import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    }`
  );

  const data = (await response.json()) as Response;
  if (!data)
    return {
      city: '',
      lat: 0,
      lng: 0,
      postcode: '',
      street: '',
    };

  const postcodeContext = data.features[0].context.find((context) =>
    context.id.includes('postcode')
  );

  const placeContext = data.features[0].context.find((context) =>
    context.id.includes('place')
  );
  const street = data.features[0].place_name.split(',')[0] || '';
  const city = placeContext?.text ?? '';
  const postcode = postcodeContext?.text ?? '';

  return {
    city,
    lat,
    lng,
    postcode,
    street,
  };
};

export default getAddressFromLatLng;
