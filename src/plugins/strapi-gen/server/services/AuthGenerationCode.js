'use strict';


const Mustache = require('mustache');


module.exports = {
    async GenerateUserController(method) {
        // Sample model schema (ideally, this should be a parameter)
        const modelSchema = {
            kind: 'collectionType',
            collectionName: 'users',
            attributes: {
                username: { type: 'string', required: true, maxLength: 20 },
                email: { type: 'string', required: true },
                numTel: { type: 'string' },
                password: { type: 'string', required: true },
            },
        };
    
        // Define templates for different request types
        const templates = {
            LOGIN: `
                export function login(req, res, next) {
                    // Login functionality
                }
            `,
            REGISTER: `
                export async function FarmerSignUp(req, res, next) {
                    // Registration functionality
                }
            `,
            FORGETPASSWORD: `
                export async function forgetPassword(req, res, next) {
                    // Forget password functionality
                }
            `,
            OTP: `
                export async function verifyOtp(req, res, next) {
                    // OTP verification functionality
                }
            `,
            RESETPASSWORD: `
                export async function resetPassword(req, res, next) {
                    // Reset password functionality
                }
            `,
        };
    
        // Convert method names to uppercase for consistency
        const supportedMethods = Object.keys(templates).map(method => method.toUpperCase());
        const methods = method.toUpperCase().split(',').map(m => m.trim());
    
        // Check if all requested methods are supported
        if (methods.some(m => !supportedMethods.includes(m))) {
            throw new Error(`Unsupported: ${method}`);
        }
    
        // Generate code for all valid methods in the request
        let renderedCode = '';
    
        methods.forEach(m => {
            const template = templates[m];
            if (template) {
                renderedCode += template;
            } else {
                // Handle unsupported method within the loop
                throw new Error(`Unsupported: ${m}`);
            }
        });
    
        return renderedCode;
    },
        
async GenerateUserModel(model) {
    if (typeof model !== 'string') {
        throw new TypeError(`Model parameter must be a string, but received: ${typeof model}`);
    }
    const modelSchema = {
        kind: 'collectionType',
        collectionName: 'users',
        attributes: {
            username: { type: 'string', required: true, maxLength: 20 },
            email: { type: 'string', required: true },
            numTel: { type: 'string' },
            password: { type: 'string', required: true },
    
        },
        };
   
    const requestType = 'models';

    const templates = {
        USERS: `
            const mongoose = require('mongoose');
            const { Schema } = mongoose;
        
            const blogsSchema = new Schema({
                Title: { type: 'string', required: true, maxLength: 20 },
                Description: { type: 'string', required: true },
                image: { type: 'string', required: true },
                Sujet: { type: 'string' },  
            });
        
            const blogs = mongoose.model('blogs', blogsSchema);
        
            module.exports = blogs;
        `,
        User: `
            // Define your UserModel template here
        `,
    };

    const models = model.toUpperCase().split(',').map(m => m.trim());
    if (models.some(m => !Object.keys(templates).includes(m))) {
        throw new Error(`invalid model data: ${model}`);
    }
    // Extract attribute names from the model schema
    let renderedCode = '';

    models.forEach(model => {
        const template = templates[model];
        if (template) {
            renderedCode += template;
        }
    });

    // Return the rendered code
    return renderedCode;
},
async GenerateUserRoutes(method) {
    if (!Array.isArray(method) || method.length === 0) {
        throw new Error('No methods selected for route generation.');
    }

    const modelSchema = {
        kind: 'collectionType',
        collectionName: 'blogs',
        attributes: {
            Title: { type: 'string', required: true, maxLength: 20 },
            Description: { type: 'string', required: true },
            image: { type: 'string', required: true },
            Sujet: { type: 'string' },
        },
    };

    const requestType = 'routes';

    const templates = {
        LOGIN: `
        router.route("/")
            .post(blogs.addBlog);

      `,
      REGISTER: `
        router.route("/All")
            .get(blogs.getAllBlogs);

      `,
      FORGETPASSWORD: `
        router.route("/updateBlog/:id")
            .patch(blogs.PATCHBlog);

      `,
      OTP: `
        router.route("/delete/:id")
            .delete(blogs.deleteBlog);

      `,
      RESETPASSWORD: `
      router.route("/delete/:id")
          .delete(blogs.deleteBlog);

    `,
    };

    let renderedCode = '';
    let importsAdded = false; // Flag to track if imports are already added

    const imports = `const express = require('express');\nconst router = express.Router();\n
    const blogs = require('../controllers/backendCode.js');\n\n`;

    method.forEach(method => {
        const template = templates[method];
        if (template) {
            if (!importsAdded) {
                renderedCode += imports; // Add imports only once
                importsAdded = true;
            }
            renderedCode += template;
        }
    });
    renderedCode += `\nmodule.exports = router;`;


    return renderedCode;
},


async generateBackend(request) {
    const { method, model } = request;

    const GenerateUserController = await this.GenerateUserController(method);
    const GenerateUserModel = await this.GenerateUserModel(model);
    const GenerateUserRoutes = await this.GenerateUserRoutes(method.split(','));

    
    return { GenerateUserController,GenerateUserModel, GenerateUserRoutes };
},
};