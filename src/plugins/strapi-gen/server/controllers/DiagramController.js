const strapi = require('strapi'); // Import Strapi instance
const { generateClassDiagram } = require('../services/diagram');

module.exports = {
  generateClassDiagram: async (ctx) => {
    try {
      const { contentType } = ctx.request.body;

      // Log the contentType just before the type check
      console.log('Content Type:', contentType);

      // Check if contentType is a string
      if (!contentType || typeof contentType !== 'string') {
        return ctx.badRequest('Content type must be a string');
      }

      // Call the service function with the Strapi instance and content type
      const classDiagram = await generateClassDiagram(contentType);
      
      // Send the class diagram as the response
      ctx.body = classDiagram;
    } catch (error) {
      // Handle errors
      console.error('Error generating class diagram:', error.message);
      ctx.badRequest(error.message);
    }
  },
};