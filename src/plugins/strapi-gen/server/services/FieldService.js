module.exports = {
    async create(ctx) {
      try {
        const entity = await strapi.services.entity.createEntity(ctx);
        ctx.send({ data: entity });
      } catch (error) {
        ctx.badRequest(error.message); // Handle errors appropriately
      }
    },
  
    // Implement similar methods for retrieving, updating, and deleting entities
  };