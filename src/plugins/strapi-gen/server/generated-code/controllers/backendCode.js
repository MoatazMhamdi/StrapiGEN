
        module.exports = {
          async handlePOST {
            const { Title, Description, image, Sujet } = ctx.request.body;
            try {
              // Add your business logic here (e.g., create a new blog entry)
              const newBlog = await strapi.services.blog.create({ Title, Description, image, Sujet });
              ctx.send(newBlog);
            } catch (error) {
              ctx.throw(500, 'Error handling  request', { error });
            }
          },
        };
      