const fs = require('fs');
const path = require('path');
const generateCode = require('../services/CodeGenerationService'); // Corrected import

module.exports = {
  async generateBackend(ctx) {
    console.log('eazeaeaze');
    try {
      const { method, model, route } = ctx.request.body;

      const backendCode = await generateCode.generateCode(method);
      const backendModels = await generateCode.generateModels(model);
      const backendRoutes = await generateCode.generateRoutes(route);

      // Define directory for generated files (adjust as needed)
      const codeDir = path.join(__dirname, '../generated-code');
      const codeDirC = path.join(__dirname, '../generated-code/controllers');
      const codeDirM = path.join(__dirname, '../generated-code/models');
      const codeDirR = path.join(__dirname, '../generated-code/routes');

      // Create directory if it doesn't exist
      if (!fs.existsSync(codeDir)) {
        fs.mkdirSync(codeDir);
      }
      if (!fs.existsSync(codeDirC)) {
        fs.mkdirSync(codeDirC);
      }
      if (!fs.existsSync(codeDirM)) {
        fs.mkdirSync(codeDirM);
      }
      if (!fs.existsSync(codeDirR)) {
        fs.mkdirSync(codeDirR);
      }

      // Write files
      fs.writeFileSync(path.join(codeDirC, 'backendCode.js'), backendCode);
      fs.writeFileSync(path.join(codeDirM, 'backendModels.js'), backendModels);
      fs.writeFileSync(path.join(codeDirR, 'backendRoutes.js'), backendRoutes);

      // Success response (optional)
      ctx.send({ message: 'Code generated successfully!' });
    } catch (error) {
      console.error('Error generating backend code:', error);
      ctx.throw(500, 'Internal server error');
    }
  }
};
