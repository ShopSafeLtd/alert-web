const validCountryCodes = new Set(['+1', '+44', '+91', '+61']);

const validateMobileWithCountryCode = (mobile: string) => {
  if (!mobile) return false;

  // Extract country code using a regular expression
  const match = mobile.match(/^(\+\d+)\s?(.*)$/); // Matches a country code (e.g., +44) followed by optional spaces and the rest of the number

  if (!match) return false; // If no match, the format is invalid

  const countryCode = match[1]; // Extracted country code (e.g., +44)
  const numberPart = match[2]; // Rest of the number

  // Check if the country code is valid and the number part is not empty
  return validCountryCodes.has(countryCode) && numberPart.length > 0;
};

export default validateMobileWithCountryCode;
