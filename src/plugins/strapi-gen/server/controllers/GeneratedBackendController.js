const fs = require('fs');
const path = require('path');
const generateCode = require('../services/CodeGenerationService'); // Corrected import
const { execSync } = require('child_process');




module.exports = {
  async generateBackend(ctx) {
    console.log('eazeaeaze');
    try {
      const { method, model, route, index  } = ctx.request.body;


      const backendCode = await generateCode.generateCode(method);
      const backendModels = await generateCode.generateModels(model);
      const backendRoutes = await generateCode.generateRoutes(route);
      const backendIndex = await generateCode.generateServerdotjs(index);


   //   const generateIndex = await generateCode.generateIndex(servermain)


      // Define directory for generated files (adjust as needed)
      const codeDir = path.join(__dirname, '../../../../../../../ReadyProductBackend');
      const codeDirC = path.join(__dirname, '../../../../../../../ReadyProductBackend/controllers');
      const codeDirM = path.join(__dirname, '../../../../../../../ReadyProductBackend/models');
      const codeDirR = path.join(__dirname, '../../../../../../../ReadyProductBackend/routes');




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
      fs.writeFileSync(path.join(codeDir, 'Server.js'), backendIndex);


      execSync('npm init -y', { cwd: codeDir });


      execSync('npm install', { cwd: codeDir });


      execSync('npm install express mongoose', { cwd: codeDir });
      execSync('npm install morgan', { cwd: codeDir });
      execSync('npm install cors', { cwd: codeDir });
      execSync('npm install cookie-parser', { cwd: codeDir });
      execSync('npm install jade', { cwd: codeDir });
      execSync('npm install http-errors', { cwd: codeDir });






      // Success response (optional)
      ctx.send({ message: 'Code generated successfully!' });
    } catch (error) {
      console.error('Error generating backend code:', error);
      ctx.throw(500, 'Internal server error');
    }
  }
};