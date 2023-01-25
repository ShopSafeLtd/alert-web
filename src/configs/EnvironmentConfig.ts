const dev = {
  API_ENDPOINT_URL: 'https://alert-api-dev.azurewebsites.net',
};

const prod = {
  API_ENDPOINT_URL: 'https://api.prod.com',
};

// const test = {
//   API_ENDPOINT_URL: 'https://api.test.com',
// };

const getEnv = () => (import.meta.env.PROD ? prod : dev);

export const env = getEnv();
