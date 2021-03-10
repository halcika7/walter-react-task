import Axios from 'axios';

const ax = Axios.create({
  baseURL: process.env.REACT_APP_URL,
});

ax.interceptors.request.use(config => {
  const newConfig = { ...config };
  newConfig.headers = {
    ...newConfig.headers,
    'X-Api-Key': process.env.REACT_APP_API_KEY,
  };

  return newConfig;
});

export const axios = ax;
