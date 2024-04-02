// plugins/client/services/strapiService.js

import axios from 'axios';

const API_URL = 'http://localhost:1337'; // Update with your Strapi URL

export async function fetchModels() {
  try {
    const response = await axios.get(`${API_URL}/api/models`);
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}
