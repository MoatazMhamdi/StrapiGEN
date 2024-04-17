'use strict';

const Mustache = require('mustache');

module.exports = {
  async generateCode(method) {
    // Sample model schema (ideally, this should be a parameter as well)
    const modelSchema = {
      kind: 'collectionType',
      collectionName: 'blogs',
      attributes: {
        Title: { type: 'string', required: true, maxLength: 20 },
        Description: { type: 'string', required: true },
        image: { type: 'string', required: true },
        Sujet: { type: 'string' },
      },
    };

    // Define templates for different request types
    const templates = {
      POST: `
        module.exports = {
          async handlePOST {
            const { {{Attributes}} } = ctx.request.body;
            try {
              // Add your business logic here (e.g., create a new blog entry)
              const newBlog = await strapi.services.blog.create({ {{Attributes}} });
              ctx.send(newBlog);
            } catch (error) {
              ctx.throw(500, 'Error handling {{RequestType}} request', { error });
            }
          },
        };
      `,
      GET: `
        module.exports = {
          async handleGET(ctx) {
            try {
              const {{Attributes}} = await {{Attributes}}.find().exec();
              ctx.send({ {{Attributes}} });
            } catch (error) {
              ctx.throw(500, 'Internal Server Error', { error });
            }
          }
        };
      `,
      PATCH:`
      module.exports = {
         async function hadnleUPDATE(ctx) {
          try {
            const { {{Attributes}} } = ctx.request.body;

        
              const user = await {{Attributes}}.findById(userId);
              if (!user) {
                  return res.status(404).json({ error: "{{Attributes}} not found" });
              }
        
              {{Attributes}}.{{Attributes}} = {{Attributes}};
              const updatedUser = await {{Attributes}}.save();
        
              res.status(200).json(updatedUser);
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
        }
      };
    `,
    DELETE:`
    module.exports = {
      export async handleDELETE (req, res, next) {
        try {
          const {{Attributes}} = req.params.{{Attributes}}; // Extract numTel from route parameter
      
          console.log('Attempting to delete user with {{Attributes}}:', {{Attributes}});
      
     
          const userToDelete = await {{Attributes}}.findOne({{Attributes}});
      
          if (!userToDelete) {
            console.log('User not found for {{Attributes}}:', {{Attributes}});
            return res.status(404).json({ message: '{{Attributes}} not found' });
          }
      
          // Delete the user
          await userToDelete.deleteOne();
      
          console.log('User deleted successfully:', userToDelete);
          res.json({ message: 'User deleted successfully', user: userToDelete });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    };
  `,
      // Add similar templates for PATCH and DELETE with appropriate logic
    };
    

    // Determine the appropriate template based on request type
    let renderedCode = '';
    if (method === 'POST, GET, PATCH, DELETE') {
      Object.values(templates).forEach((template) => {
        renderedCode += Mustache.render(template, { Attributes: Object.keys(modelSchema.attributes).join(', ') });
      });
    } else {
      const template = templates[method.toUpperCase()];
      if (template) {
        renderedCode = Mustache.render(template, { Attributes: Object.keys(modelSchema.attributes).join(', ') });
      } else {
        throw new Error(`Unsupported request method: ${method}`);
      }
    }

    return renderedCode;
  },
  async generateModels(model) {
    // Sample model schema (ideally, this should be a parameter as well)
     // Sample model schema
     const modelSchema = {
      kind: 'collectionType',
      collectionName: 'blogs',
      attributes: {
        Title: { type: 'string', required: true, maxLength: 20 },
        Description: { type: 'string', required: true },
        image: { type: 'string', required: true },
        Sujet: { type: 'string' },  
      },
    };
 
    const requestType = 'models';
   
    // Define a template for the backend function
    const template = `
      module.exports = {
        "Title": {
        "type": "string",
        "required": true,
        "maxLength": 20
      },
      "Description": {
        "type": "string",
        "required": true
      },
      "image": {
        "type": "string",
        "required": true
      },
      "Sujet": {
        "type": "string"
      }
      };
    `;
   
    // Extract attribute names from the model schema
    const attributes = Object.keys(modelSchema.attributes);
   
    // Render the template with the extracted attributes and request type
    const renderedCode = Mustache.render(template, {
      RequestType: requestType.toUpperCase(),
      Attributes: attributes.join(', '),
    });
   
    // Return the rendered code
    return renderedCode;
  },
  async generateRoutes(route) {
    // Sample model schema (ideally, this should be a parameter as well)
     // Sample model schema
     const modelSchema = {
      kind: 'collectionType',
      collectionName: 'blogs',
      attributes: {
        Title: { type: 'string', required: true, maxLength: 20 },
        Description: { type: 'string', required: true },
        image: { type: 'string', required: true },
        Sujet: { type: 'string' },  
      },
    };
 
    const requestType = 'routes';
   
    // Define a template for the backend function
    const template = `
    module.exports = [
  
    
      {
        method: 'POST',
        path: '/custom-entities',
        handler: 'EntityController.create',
        config: {
          auth: false, 
        },
      },
    
      {
        method: 'GET',
        path: '/custom-entities', 
        handler: 'EntityController.getAll', 
        config: {
          auth: false, 
        },
      },
  
    
      {
        method: 'PUT',
        path: '/custom-entities/:id',
        handler: 'EntityController.update',
        config: {
          auth: false,
        },
      },
    
      {
        method: 'DELETE',
        path: '/custom-entities/:id',
        handler: 'EntityController.delete',
        config: {
          auth: false,
        },
      
      },
    
     
    
    
      
    
    ];
     
    `;
   
    // Extract attribute names from the model schema
    const attributes = Object.keys(modelSchema.attributes);
   
    // Render the template with the extracted attributes and request type
    const renderedCode = Mustache.render(template, {
      RequestType: requestType.toUpperCase(),
      Attributes: attributes.join(', '),
    });
   
    // Return the rendered code
    return renderedCode;
  },
};
