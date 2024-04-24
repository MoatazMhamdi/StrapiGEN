const GeneratedBackendController = require('../controllers/GeneratedBackendController');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/pwd',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/accessTokenPath/git',
    handler: 'githubController.githubC',
    config: {
     
      auth: false,
     
    }
  },
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
    method: 'GET',
    path: '/custom-entities/:id',
    handler: 'EntityController.getById',
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
  {
    method: 'POST',
    path: '/generate-docker-files',
    handler: 'controller.generateDockerFiles',
    config: {
      auth: false,
    },
  },

  {
    method: 'POST',
    path: '/generate-backend',
   
    handler: 'GeneratedBackendController.generateBackend', // Access exported function
    config: {
     
      auth: false,
     
    }
  },

];
