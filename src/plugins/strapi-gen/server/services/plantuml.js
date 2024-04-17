const plantuml = require('node-plantuml');

module.exports = {
  generateDiagram: async (umlCode) => {
    return plantuml.generate(umlCode, { format: 'png' });
  }
};
