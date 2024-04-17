const diagramService = require('../services/diagram');

module.exports = {
  generateClassDiagram: async (ctx) => {
    try {
      const { entityName } = ctx.request.body;

      // Log the entityName received from the frontend
      console.log('Entity Name:', entityName);

      // Check if entityName is provided
      if (!entityName || typeof entityName !== 'string') {
        return ctx.badRequest('Invalid entity name');
      }

      // Call the service function to fetch content type details
      const contentTypeData = await diagramService.fetchContentType(entityName);

      // Return the content type data as the response
      ctx.send({ contentTypeData });
    } catch (error) {
      // Handle errors
      console.error('Error fetching content type data:', error);
      ctx.badRequest('Error fetching content type data');
    }
  }
};
