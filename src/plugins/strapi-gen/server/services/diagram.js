const sqlite3 = require('sqlite3');
const { spawn } = require('child_process');
const fs = require('fs');

module.exports = {
  async generateDataDiagram(contentType) {
    // Check if contentType is a string
    if (typeof contentType !== 'string') {
      throw new Error('Content type must be a string');
    }

    if (!contentType) {
      throw new Error('Content type is required');
    }

    const modelName = contentType.split('.')[1];

    // Call getAllEntities to fetch the entities
    const entities = await this.getAllEntities();

    // Find the model based on modelName
    const model = entities.find(entity => entity.name === modelName);

    if (!model) {
      throw new Error(`Model with name ${modelName} not found`);
    }

    // Generate the class diagram based on the model attributes
    const plantuml = `@startuml\n\n`;

    for (const attr of model.attributes) {
      plantuml += `entity ${attr.name} {\n`;
      plantuml += `  ${attr.name} : ${attr.type}\n`;
      plantuml += `}\n\n`;
    }

    plantuml += '@enduml';

    // Write the PlantUML code to a temporary file
    const tempFileName = 'diagram.puml';
    fs.writeFileSync(tempFileName, plantuml);

    // Generate the diagram image using PlantUML command line tool
    const plantUmlProcess = spawn('plantuml', [tempFileName]);

    const diagramData = await new Promise((resolve, reject) => {
      plantUmlProcess.stdout.on('data', data => {
        resolve(data);
      });

      plantUmlProcess.stderr.on('data', err => {
        reject(err.toString());
      });
    });

    // Clean up temporary file
    fs.unlinkSync(tempFileName);

    return diagramData;
  },

  async getAllEntities() {
    const db = new sqlite3.Database('.tmp/data.db', sqlite3.OPEN_READWRITE);

    const entities = await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT * FROM entities', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });

    db.close();

    return entities;
  }
};
