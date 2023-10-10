interface Response {
  features: {
    place_name: string;
    context: {
      id: string;
      text: string;
    }[];
  }[];
}

/**
 * Get the address from a lat lng pair.
 * @param {number} lat - The latitude.
 * @param {number} lng - The longitude.
 * @returns {Promise<{street: string, city: string, postcode: string, lat: number, lng: number}>} Returns an object containing the street, city, postcode, lat, and lng. On error returns empty strings and 0 for lat and lng.
 */
const getAddressFromLatLng = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<{
  street: string;
  city: string;
  postcode: string;
  lat: number;
  lng: number;
}> => {
  if (!lat || !lng) {
    return {
      street: '',
      city: '',
      postcode: '',
      lat: 0,
      lng: 0,
    };
  }
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
      import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    }`
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: Response = await response.json();
  if (!data)
    return {
      street: '',
      city: '',
      postcode: '',
      lat: 0,
      lng: 0,
    };

  const postcodeContext = data.features[0].context.find((context) =>
    context.id.includes('postcode')
  );

  const placeContext = data.features[0].context.find((context) =>
    context.id.includes('place')
  );
  const street = data.features[0].place_name.split(',')[0] || '';
  const city = placeContext?.text || '';
  const postcode = postcodeContext?.text || '';

  return {
    street,
    city,
    postcode,
    lat,
    lng,
  };
};

export default getAddressFromLatLng;
