            'use strict';


            const Mustache = require('mustache');


            module.exports = {
            async generateCode(method) {
                // Sample model schema (ideally, this should be a parameter)
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
            
                // Define templates for different request types
                const templates = {
                POST: `
                    import Blog from "../models/backendModels.js";
            
                    // Import your models
            
                    export async function addBlog(req, res, next) {
                    const blogs = new Blog({
                      {{  Title: req.body.Title,
                        Description: req.body.Description,
                        image: req.body.image,
                        Sujet: req.body.Sujet,}}
                    });
            
                    await blogs.save()
                        .then((blogs) => res.status(200).json({ blogs }))
                        .catch((error) => res.status(400).json({ error }));
                    }
                `,
                GET: `
                    export async function getAllBlogs(req, res, next) {
                    try {
                        const blogs = await Blog.find().exec();
                        res.status(200).json(blogs);
                    } catch (error) {
                        res.status(500).json({ error: 'Internal Server Error' });
                        console.error(error);
                    }
                    }
                `,
                PATCH: `
                    export async function PATCHBlog(req, res) {
                    try {
                        const blogsId = req.params.id; // Corrected from req.param.id
            
                        const { Title, Description, image, Sujet } = req.body;
            
                        const blog = await Blog.findById(blogsId); // Corrected from blogs.findById
            
                        if (!blog) {
                        return res.status(404).json({ error: "Blog not found" }); // Corrected from "blog not found"
                        }
            
                        blog.Title = Title;
                        blog.Description = Description;
                        blog.image = image;
                        blog.Sujet = Sujet;
            
                        const updatedBlog = await blog.save(); // Renamed to avoid conflict with function name
            
                        res.status(200).json(updatedBlog);
                    } catch (error) {
                        res.status(500).json({ error: error.message });
                    }
                    }
                `,
                DELETE: `
                    export async function deleteBlog(req, res, next) {
                    try {
                        const blogId = req.params.id; // Corrected from req.param.id
            
                        console.log('Attempting to delete blog with ID:', blogId);
            
                        // Find the blog by its ID
                        const blogToDelete = await Blog.findOne({ _id: blogId }); // Corrected to use _id
            
                        if (!blogToDelete) {
                        console.log('Blog not found for ID:', blogId);
                        return res.status(404).json({ message: 'Blog not found' });
                        }
            
                        // Delete the blog
                        await blogToDelete.deleteOne();
            
                        console.log('Blog deleted successfully:', blogToDelete);
                        res.json({ message: 'Blog deleted successfully', blog: blogToDelete });
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal Server Error' });
                    }
                    }
                `,
                };
            
                // Validate request method (assuming `method` can only be uppercase)
                if (!method || !method.toUpperCase().split(',').every(m => Object.keys(templates).includes(m))) {
                throw new Error(`Unsupported request methods: ${method}`);
                }
            
                // Generate code for all valid methods in the request
                let renderedCode = '';
                const methods = method.toUpperCase().split(',');
                for (const m of methods) {
                const template = templates[m];
                if (template) {
                    renderedCode += Mustache.render(template, { Attributes: Object.keys(modelSchema.attributes).join(', ') });
                } else {
                    // Handle unsupported method within the loop
                    throw new Error(`Unsupported request method: ${m}`);
                }
                }
            
                return renderedCode;
            },
            async generateModels(model) {
                // Sample model schema (ideally, this should be a parameter as well)
                // Sample model schema
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
            
                const requestType = 'models';
            
                // Define a template for the backend function
                const template = `
            
                import mongoose from 'mongoose'; // Importer Mongoose
                const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
                const blogsSchema = new mongoose.Schema({
                Title: { type: 'string', required: true, maxLength: 20 },
                Description: { type: 'string', required: true },
                image: { type: 'string', required: true },
                Sujet: { type: 'string' },  
                });
            
                const blogs = mongoose.model('blogs', blogsSchema);
                export default model("backendModels",blogsSchema);
            
                `;
            
                // Extract attribute names from the model schema
                const attributes = Object.keys(modelSchema.attributes);
            
                // Render the template with the extracted attributes and request type
                const renderedCode = Mustache.render(template, {
                RequestType: requestType.toUpperCase(),
                Attributes: attributes.join(', '),
                });
            
                // Return the rendered code
                return renderedCode;
            },
            async generateRoutes(route) {
                // Sample model schema (ideally, this should be a parameter as well)
                // Sample model schema
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
            
                // Define a template for the backend function
                // Define a template for the backend function
                const template = `
            
                import express from 'express';
                import * as blogs   from '../controllers/backendCode.js';
            
                const router = express.Router();
            
                router.route("/")
                    .post(blogs.addBlog)


                router.route("/updateBlog/:id")
                    .patch(blogs.PATCHBlog)
            
            
                router.route("/delete/:id")
                    .delete(blogs.deleteBlog)




                    router.route('/All')
                .get(blogs.getAllBlogs)
            
                export default router;
                
            
                
                `;


            
                // Extract attribute names from the model schema
                const attributes = Object.keys(modelSchema.attributes);
            
                // Render the template with the extracted attributes and request type
                const renderedCode = Mustache.render(template, {
                RequestType: requestType.toUpperCase(),
                Attributes: attributes.join(', '),
                });
            
                // Return the rendered code
                return renderedCode;
            },
            async generateServerdotjs(index) {
                // Sample model schema (ideally, this should be a parameter as well)
                // Sample model schema
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




                const requestType = 'index';


            const template = `
            import  express  from 'express'; // Importer express
            import mongoose from 'mongoose'; // Importer Mongoose
            import morgan from 'morgan';




            import blogRoutes from './routes/backendRoutes.js';
            import cookieParser from 'cookie-parser';




            import cors from 'cors'


            const hostname = '127.0.0.1';
            const app =express();
            const port = process.env.port || 9090;
            const databaseName = 'ReadyBackendDB';


            // Cela afichera les requêtes MongoDB dans le terminal
            mongoose.set('debug', true);
            // Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
            mongoose.Promise = global.Promise;


            // Se connecter à MongoDB
            mongoose
            // remove the / next to $
            .connect('mongodb://127.0.0.1:27017/dababaseName')  // change dataBaseName
            .then(() => {
                // Une fois connecté, afficher un message de réussite sur la console
                console.log('Connected to DB');
            })
            .catch(err => {
                // Si quelque chose ne va pas, afficher l'erreur sur la console
                console.log(err);
            });


            app.use(cors());
            app.use(express.json());
            app.use(morgan("dev"));
            app.use(cookieParser());




            app.use('/blog',blogRoutes);




            /**
             * Démarrer le serveur à l'écoute des connexions
             */
            app.listen(port, hostname,() => {
                console.log('Server running at http://localhost:9090/');


            })




            
            `;
            
            // Extract attribute names from the model schema
            const attributes = Object.keys(modelSchema.attributes);
            
            // Render the template with the extracted attributes and request type
            const renderedCode = Mustache.render(template, {
                RequestType: requestType.toUpperCase(),
                Attributes: attributes.join(', '),
            });
            
            // Return the rendered code
            return renderedCode;
            },
            };
