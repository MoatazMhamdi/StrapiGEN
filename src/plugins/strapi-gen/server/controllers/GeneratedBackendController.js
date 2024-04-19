const fs = require('fs');
const path = require('path');
const generateCode = require('../services/CodeGenerationService');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/rest');

module.exports = {
  async generateBackend(ctx) {
    console.log('eazeaeaze');
    try {
      const { method, model, route, index, selectedRepo } = ctx.request.body; // Changed variable name to selectedRepo

      const backendCode = await generateCode.generateCode(method);
      const backendModels = await generateCode.generateModels(model);
      const backendRoutes = await generateCode.generateRoutes(method.split(','));
     //const backendRoutes = await generateCode.generateRoutes(route);

      const backendIndex = await generateCode.generateServerdotjs(index);

   
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

      // Run npm commands to generate package.json and install dependencies
      execSync('npm init -y', { cwd: codeDir });
      execSync('npm install', { cwd: codeDir });
      execSync('npm install express mongoose morgan cors cookie-parser jade http-errors', { cwd: codeDir });

      const [owner, repo] = selectedRepo.split('/');
console.log('hedha see',selectedRepo)
      // Push code to GitHub repository
      const octokit = new Octokit({
        auth: 'token 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', // Replace with your GitHub personal access token
      });

      // Push files to GitHub
      const responseBackendCode = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'Controller/backendCode.js',
        message: 'Add backend code',
        content: Buffer.from(backendCode).toString('base64'),
      });

      const responseBackendModels = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'Model/backendModels.js',
        message: 'Add backend models',
        content: Buffer.from(backendModels).toString('base64'),
      });

      const responseBackendRoutes = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'Route/backendRoutes.js',
        message: 'Add backend routes',
        content: Buffer.from(backendRoutes).toString('base64'),
      });

      const responseBackendIndex = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'Server.js',
        message: 'Add backend index',
        content: Buffer.from(backendIndex).toString('base64'),
      });

      // Success response (optional)
      ctx.send({ message: 'Code generated and pushed to GitHub successfully!' });
    } catch (error) {
      console.error('Error generating backend code:', error);
      ctx.throw(500, 'Internal server error');
    }
  }
};
