'use strict';

const myService = require('./my-service');
const EntityService = require('./EntityService')
const DockerService = require('./DockerService')
const githubService = require('./githubService')

module.exports = {
  myService,
  EntityService,
  DockerService,
  githubService
};
