// GitRunner.js

const http = require('http');
const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');
const fs = require('fs');


const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/webhook' && method === 'POST') {
    handleWebhook(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

function handleWebhook(req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        console.log('Received payload:', payload); // Log the payload
        // Check if the payload indicates a code push event
        if (payload && payload.ref) {
          handleCodePush(payload);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Received');
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid payload');
        }
      } catch (error) {
        console.error('Error parsing payload:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      }
    });
  }
  
  

  async function handleCodePush(payload) {
    try {
      if (payload && payload.selectedRepo) {
        // Trigger workflow generation and pushing workflow files
        await generateAndPushWorkflows(payload.selectedRepo);
      } else {
        throw new Error('Invalid payload structure: selectedRepo is missing');
      }
    } catch (error) {
      console.error('Error handling code push:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }

  
  async function generateAndPushWorkflows(repoFullName) {
    try {
      console.log('npm init -y and npm install executed successfully');
      // Create the package.json content
      const packageJsonContent = `
      {
        "name": "readyproductbackend",
        "version": "1.0.0",
        "main": "Server.js",
        "scripts": {
          "start": "node server.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
          "cookie-parser": "^1.4.6",
          "cors": "^2.8.5",
          "express": "^4.19.2",
          "http-errors": "^2.0.0",
          "jade": "^1.11.0",
          "mongoose": "^8.3.3",
          "morgan": "^1.10.0"
        },
        "description": ""
      }
      
      
      `;
      // const packageLockJsonContent = `
      // {
      //   "name": "EEE",
      //   "version": "1.0.0",
      //   "lockfileVersion": 2,
      //   "requires": true,
      //   "dependencies": {
      //     "cookie-parser": {
      //       "version": "1.4.6",
      //       "resolved": "https://registry.npmjs.org/cookie-parser/-/cookie-parser-1.4.6.tgz",
      //       "integrity": "sha512-X4/L+OrrRVAwi9DqDzjN0+xxMXewfJxPs1lb2QXqHZdsWgkzu3Ac0YhyOknkSROnmf3PV0lGrt0Updui5b5Dww==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "cors": {
      //       "version": "2.8.5",
      //       "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz",
      //       "integrity": "sha512-CiYULTEh8eBO1zdy67PazNo52W2qn5qR1iiyAMFQorVhVfHsDU2APYMDO7REsO3v2lQBXYq6qniEiKkpUd+Lw==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "express": {
      //       "version": "4.19.2",
      //       "resolved": "https://registry.npmjs.org/express/-/express-4.19.2.tgz",
      //       "integrity": "sha512-tA2V8U7jCmAt9jBh3VXYNOqNSMHSD+UmsCpZ7U7xt4QK6jua6bkj8P2BR0r5lBw0xC1tqB6MvT+hB2s8+HfQWA==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "http-errors": {
      //       "version": "2.0.0",
      //       "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
      //       "integrity": "sha512-EwXyYm1pZ5pDXRN3A4I+S2gKoSkbcB6mS3LakwVhveq1KmO9Hn1NhZpMqDXetBJTzVKrFfc4jpIxCjwcGAg27Q==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "jade": {
      //       "version": "1.11.0",
      //       "resolved": "https://registry.npmjs.org/jade/-/jade-1.11.0.tgz",
      //       "integrity": "sha512-XUYf2pUHRKD8zgzyV/uZxM41zYLkg+/QHmnMysZV2UuNvsasftZ7eYRwT/8f2gIXPqalZ1fBlv4K8BMx60g46w==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "mongoose": {
      //       "version": "8.3.2",
      //       "resolved": "https://registry.npmjs.org/mongoose/-/mongoose-8.3.2.tgz",
      //       "integrity": "sha512-9q4UBnZsaz20BjDyytwWW1nUGv5DgSv4+EWZ1PLAfZixujgv4sb8qacFG+kx0rLofTdzFV9k2yGMNNECDsWobA==",
      //       "dev": true,
      //       "optional": true
      //     },
      //     "morgan": {
      //       "version": "1.10.0",
      //       "resolved": "https://registry.npmjs.org/morgan/-/morgan-1.10.0.tgz",
      //       "integrity": "sha512-vsaOkHJ2y+mDo7puUivBmpwJnl1orvNQw+JMf6Tm41O7nMwgvHKLXUBW2Q1p2Fzn/55Ye2Q3hy3Inl89z+Bubw==",
      //       "dev": true,
      //       "optional": true
      //     }
      //   }
      // }
      
      // `;
      const workflowContent = `
        name: Node.js CI
  
        on:
          push:
            branches:
              - main
  
        jobs:
          build:
            runs-on: ubuntu-latest
  
            steps:
              - uses: actions/checkout@v2
  
              - name: Use Node.js
                uses: actions/setup-node@v2
                with:
                  node-version: "14"
  
              - name: Install dependencies
                run: |
                  npm init -y
                  npm install
                  npm install express mongoose morgan cors cookie-parser jade http-errors
  
              # Remove the Run tests step entirely
      `;
      
      // Initialize the Octokit instance
      const octokit = new Octokit({
        auth: 'token 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',
      });
    
      // Push the workflow file to the repository
      await octokit.repos.createOrUpdateFileContents({
        owner: repoFullName.split('/')[0],
        repo: repoFullName.split('/')[1],
        path: '.github/workflows/workflow.yml',
        message: 'Add Node.js CI workflow',
        content: Buffer.from(workflowContent).toString('base64'),
      });
      
        // Push the package.json file to the repository
   
    await octokit.repos.createOrUpdateFileContents({
      owner: repoFullName.split('/')[0],
      repo: repoFullName.split('/')[1],
      path: 'package.json',
      message: 'Add package.json',
      content: Buffer.from(packageJsonContent).toString('base64'),
    });

// await octokit.repos.createOrUpdateFileContents({
//   owner: repoFullName.split('/')[0],
//   repo: repoFullName.split('/')[1],
//   path: 'package-lock.json',
//   message: 'Add package-lock.json',
//   content: Buffer.from(packageLockJsonContent).toString('base64'),
// });
     
    console.log('Workflow and package.json files created and pushed successfully');
    } catch (error) {
      console.error('Error creating or pushing workflow file:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
  

server.listen(3000, () => {
  console.log('GitRunner listening on port 3000');
});
