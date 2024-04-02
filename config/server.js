const crypto = require('crypto');
const codeGenerationService = require('../src/plugins/strapi-gen/server/services/CodeGenerationService');

function generateRandomKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: [generateRandomKey(32), generateRandomKey(32)],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },

  services: {
    // Define the service under the correct namespace
    codeGenerationService: {
      generateModel: codeGenerationService.generateModel,
      generateController: codeGenerationService.generateController,
      generateRoutes: codeGenerationService.generateRoutes
    }
  },
});
