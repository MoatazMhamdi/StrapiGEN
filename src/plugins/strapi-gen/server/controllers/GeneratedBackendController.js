const fs = require('fs');
const path = require('path');
const generateCode = require('../services/CodeGenerationService');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/rest');
const http = require('http');



module.exports = {
  async generateBackend(ctx) {
    console.log('eazeaeaze');
    try {
      const { method, model, route, index, selectedRepo ,tokenGitOauth} = ctx.request.body; // Changed variable name to selectedRepo

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

      //Write files
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
        auth: `token ${tokenGitOauth}`, // Use the token from the request payload
      });

      // Push files to GitHub
      const responseBackendCode = await octokit.repos.createOrUpdateFileContents({
       owner,
        repo,
        path: 'controllers/backendCode.js',
        message: 'Add backend code',
        content: Buffer.from(backendCode).toString('base64'),
      });

      const responseBackendModels = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'models/backendModels.js',
        message: 'Add backend models',
        content: Buffer.from(backendModels).toString('base64'),
      });

      const responseBackendRoutes = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'routes/backendRoutes.js',
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
      const options = {
        hostname: 'localhost', // Change to your GitRunner.js server hostname or IP
        port: 3000, // Change to your GitRunner.js server port
        path: '/webhook',
        method: 'POST',
      };
      
      console.log('Webhook Endpoint:', `http://${options.hostname}:${options.port}${options.path}`);

      const req = http.request(options, (res) => {
        console.log(`GitRunner.js statusCode: ${res.statusCode}`);
      });
      
      req.on('error', (error) => {
        console.error('GitRunner.js request error:', error);
      });
      
      // Log the payload before sending
        console.log('Payload:', JSON.stringify({ ref: 'refs/heads/main', selectedRepo }));

      // Send the webhook payload
          req.write(JSON.stringify({ ref: 'refs/heads/main', selectedRepo }));
           req.end();
      // Return response to the client
      ctx.send({ message: 'Code generated and pushed to GitHub successfully!' });
    } catch (error) {
      console.error('Error generating backend code:', error);
      ctx.throw(500, 'Internal server error');
    }
    
  }
};
