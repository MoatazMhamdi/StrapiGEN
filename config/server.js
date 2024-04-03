const crypto = require('crypto');
const EntityService = require('../src/plugins/strapi-gen/server/services/EntityService');

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
    EntityService: {
      createEntity: require('../src/plugins/strapi-gen/server/services/EntityService').createEntity // Replace with your service object path
    }
  }
});
