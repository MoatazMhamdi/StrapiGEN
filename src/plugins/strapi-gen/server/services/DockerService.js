// services/DockerService.js
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  generateDockerFiles: async (configData, imageName, nodeVersion, port) => {
  try {
    // Extraire les données de configuration
    const { databaseClient, databaseHost, databasePort, appKeys, nodeEnv } = configData;

    // Logique pour générer le contenu du Dockerfile
    const dockerfileContent = `FROM ${imageName}:${nodeVersion}-alpine

    # Ajoutez d'autres instructions Docker en fonction de votre configuration

    WORKDIR /opt/app

    COPY package*.json ./

    RUN yarn install

    COPY . .

    ENV APP_KEYS=${appKeys}
    ENV NODE_ENV=${nodeEnv}

    EXPOSE ${port}

    CMD ["yarn", "start"]
    `;

    // Logique pour générer le contenu du docker-compose.yml
    const dockerComposeContent = `version: "3"

    services:
      strapi:
        container_name: strapi
        build: .
        volumes:
          - ./config:/opt/app/config
          - ./src:/opt/app/src
          - ./types:/opt/app/types 
          - ./package.json:/opt/package.json
          - ./yarn.lock:/opt/yarn.lock
          - ./.env:/opt/app/.env
          - ./public/uploads:/opt/app/public/uploads
        ports:
          - "${port}:${port}"
        depends_on:
          - strapiDB

      strapiDB:
        container_name: strapiDB
        platform: linux/amd64 #for platform error on Apple M1 chips
        restart: unless-stopped
        env_file: .env
        image: mysql:5.7
        command: --default-authentication-plugin=mysql_native_password
        environment:
          MYSQL_USER: ${databaseClient}
          MYSQL_ROOT_PASSWORD: ${databaseHost}
          MYSQL_PASSWORD: ${databasePort}
          MYSQL_DATABASE: ${databaseHost}
        volumes:
          - strapi-data:/var/lib/mysql
          #- ./data:/var/lib/mysql # if you want to use a bind folder
        ports:
          - "3306:3306"
        networks:
          - strapi

    volumes:
      strapi-data:

    networks:
      strapi:
        name: Strapi
        driver: bridge
    `;

    // Enregistrez le Dockerfile
    const dockerfilePath = path.join(__dirname, '..', 'docker', 'Dockerfile');
    fs.writeFileSync(dockerfilePath, dockerfileContent);

    // Enregistrez le docker-compose.yml
    const dockerComposePath = path.join(__dirname, '..', 'docker', 'docker-compose.yml');
    fs.writeFileSync(dockerComposePath, dockerComposeContent);

    return { message: 'Fichiers Docker générés avec succès' };
  } catch (error) {
    console.error('Erreur lors de la génération des fichiers Docker', error);
    throw new Error('Erreur lors de la génération des fichiers Docker');
  }
},
};