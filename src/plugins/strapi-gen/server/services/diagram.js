
const axios = require('axios');

module.exports = {
  fetchContentType: async (entityName) => {
    try {
      const contentTypeUrl = `http://localhost:1337/admin/plugins/strapi-gen/DataModel/api/content-type-builder/content-types/plugin::strapi-gen.${entityName}`;
      const response = await axios.get(contentTypeUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching content type:', error);
      throw error;
    }
  }
};
