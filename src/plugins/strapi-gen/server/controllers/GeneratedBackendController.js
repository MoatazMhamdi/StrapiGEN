const fs = require('fs');
const path = require('path');
const generateCode = require('../services/CodeGenerationService');
const generateUser = require('../services/AuthGenerationCode');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/rest');
const http = require('http');

module.exports = {
  async generateBackend(ctx) {
    console.log('eazeaeaze');
    try {
      const { method, model, route, index, selectedRepo } = ctx.request.body;

      let backendCode, backendModels, backendRoutes, backendIndex;

      // Define directory for generated files
      const codeDir = path.join(__dirname, '../../../../../../../ReadyProductBackend');
      const codeDirC = path.join(codeDir, 'controllers');
      const codeDirM = path.join(codeDir, 'models');
      const codeDirR = path.join(codeDir, 'routes');

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

      if (model === 'BLOGS' || model === 'USERS') {
        if (model === 'BLOGS') {
          backendCode = await generateCode.generateCode(method);
          backendModels = await generateCode.generateModels(model);
          backendRoutes = await generateCode.generateRoutes(method.split(','));
          backendIndex = await generateCode.generateServerdotjs(index);
        } else if (model === 'USERS') {
          backendCode = await generateUser.GenerateUserController(method);
          backendModels = await generateUser.GenerateUserModel(model);
          backendRoutes = await generateUser.GenerateUserRoutes(method.split(','));
          backendIndex = await generateCode.generateServerdotjs(index);
        }

        // Write generated code to files
        fs.writeFileSync(path.join(codeDirC, 'backendCode.js'), backendCode);
        fs.writeFileSync(path.join(codeDirM, 'backendModels.js'), backendModels);
        fs.writeFileSync(path.join(codeDirR, 'backendRoutes.js'), backendRoutes);
        fs.writeFileSync(path.join(codeDir, 'Server.js'), backendIndex);
      } else if (model === 'USERS , BLOGS' || model === 'BLOGS , USERS') {
        // Split the model string to get individual models
        const models = model.split(' , ');

        // Generate code for each model
        for (const model of models) {
          if (model === 'BLOGS') {
            backendCode = await generateCode.generateCode(method);
            backendModels = await generateCode.generateModels(model);
            backendRoutes = await generateCode.generateRoutes(method.split(','));
            backendIndex = await generateCode.generateServerdotjs(index);
          } else if (model === 'USERS') {
            backendCode = await generateUser.GenerateUserController(method);
            backendModels = await generateUser.GenerateUserModel(model);
            backendRoutes = await generateUser.GenerateUserRoutes(method.split(','));
            backendIndex = await generateCode.generateServerdotjs(index);
          }

          // Write generated code to files
          fs.writeFileSync(path.join(codeDirC, 'backendCode.js'), backendCode);
          fs.writeFileSync(path.join(codeDirM, 'backendModels.js'), backendModels);
          fs.writeFileSync(path.join(codeDirR, 'backendRoutes.js'), backendRoutes);
          fs.writeFileSync(path.join(codeDir, 'Server.js'), backendIndex);

          // Return early since files are pushed inside the loop
          ctx.send({ message: 'Code generated and pushed to GitHub successfully!' });
          return;
        }
      } else {
        ctx.send({ message: 'Select a model plz!' });
        console.log('select a model');
        return;
      }

      // Run npm commands to generate package.json and install dependencies
      execSync('npm init -y', { cwd: codeDir });
      execSync('npm install', { cwd: codeDir });
      execSync('npm install express mongoose morgan cors cookie-parser jade http-errors', { cwd: codeDir });

      // Push code to GitHub repository
      const [owner, repo] = selectedRepo.split('/');
      await pushFilesToGitHub(owner, repo, model, backendCode, backendModels, backendRoutes, backendIndex);

      // Log the payload before sending
      console.log('Payload:', JSON.stringify({ ref: 'refs/heads/main', selectedRepo }));

      // Send the webhook payload
      const options = {
        hostname: 'localhost', // Change to your GitRunner.js server hostname or IP
        port: 3000, // Change to your GitRunner.js server port
        path: '/webhook',
        method: 'POST',
      };

      const req = http.request(options, (res) => {
        console.log(`GitRunner.js statusCode: ${res.statusCode}`);
      });

      req.on('error', (error) => {
        console.error('GitRunner.js request error:', error);
      });

      req.write(JSON.stringify({ ref: 'refs/heads/main', selectedRepo }));
      req.end();

      // Return response to the client
      ctx.send({ message: 'Code generated and pushed to GitHub successfully!' });
    } catch (error) {
      console.error('Error generating backend code:', error);
      ctx.throw(500, 'Internal server error');
    }
  },
};

async function pushFilesToGitHub(owner, repo, model, backendCode, backendModels, backendRoutes, backendIndex) {
  const octokit = new Octokit({
    auth: 'token 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', // Replace with your GitHub personal access token
  });

  // Define file paths based on model
  const codeFilePath = `controllers/backendCode.js`;
  const modelsFilePath = `models/backendModels.js`;
  const routesFilePath = `routes/backendRoutes.js`;
  const indexFilePath = `Server.js`;

  // Push files to GitHub
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: codeFilePath,
    message: `Add backend code for ${model}`,
    content: Buffer.from(backendCode).toString('base64'),
  });

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: modelsFilePath,
    message: `Add backend models for ${model}`,
    content: Buffer.from(backendModels).toString('base64'),
  });

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: routesFilePath,
    message: `Add backend routes for ${model}`,
    content: Buffer.from(backendRoutes).toString('base64'),
  });

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: indexFilePath,
    message: `Add backend index for ${model}`,
    content: Buffer.from(backendIndex).toString('base64'),
  });

  console.log(`Files pushed to GitHub for ${model}`);
}
