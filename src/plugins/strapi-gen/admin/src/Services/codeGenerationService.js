import axios from 'axios';

const baseUrl = 'http://localhost:1337'; // Replace with your Strapi API endpoint

export const generateCode = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/strapi-gen/generate-backend`, data);
    return response.data;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error; // Re-throw for handling in React component
  }
};
