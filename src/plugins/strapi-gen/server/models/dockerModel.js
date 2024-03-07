const fs = require('fs');
const path = require('path');

// Define the path to the Dockerfile
const dockerfilePath = path.join(__dirname, 'Dockerfile');

// Create an empty Dockerfile
if (!fs.existsSync(dockerfilePath)) {
  fs.writeFileSync(dockerfilePath, '');
}

// Define the contents of the Dockerfile
const dockerfileContent = `
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
`;

// Define the contents of the docker-compose.yml file
const dockerComposeContent = `
version: "3"

services:
  strapi:
    image: strapi/strapi
    container_name: strapi
    environment:
      - DATABASE_HOST=strapi-data
      - DATABASE_PORT=5432
      - DATABASE_NAME=strapi
      - DATABASE_USERNAME=strapi
      - DATABASE_PASSWORD=strapi
    volumes:
      - ./:/srv/app
    ports:
      - 1337:1337
    depends_on:
      - strapi-data

  strapi-data:
    image: postgres:13-alpine
    container_name: strapi-data
    environment:
      - POSTGRES_DB=strapi
      - POSTGRES_USER=strapi
      - POSTGRES_PASSWORD=strapi
    volumes:
      - ./data:/var/lib/postgresql/data
    ports:
      - 5432:5432
`;



// Write the contents to the Dockerfile
fs.writeFileSync(dockerfilePath, dockerfileContent);


console.log('Dockerfile generated successfully.');

