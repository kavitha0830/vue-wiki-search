import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const wikiSearch = async (searchQuery) => {
  try {
    const response = await apiClient.get(`/search`, {
      params: { q: searchQuery },
    });
    return response.data.query.search;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('API call error:', axiosError);
    throw axiosError;
  }
};