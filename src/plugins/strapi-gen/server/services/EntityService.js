const sqlite3 = require('sqlite3').verbose();

module.exports = {
  async createEntity(ctx) {
    const { name, description, fields } = ctx.request.body;

    // Validate data ...

    const db = new sqlite3.Database('.tmp/data.db', sqlite3.OPEN_READWRITE);

    db.serialize(() => {
      // Create table if it doesn't exist (consider using schema migration tools for production)
      db.run('CREATE TABLE IF NOT EXISTS entities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, fields TEXT)', (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Table created successfully");
        }
      });

      // Insert new entity data
      const stmt = db.prepare('INSERT INTO entities (name, description, fields) VALUES (?, ?, ?)');
      stmt.run(name, description, JSON.stringify(fields));
      stmt.finalize();
    });

    db.close();

    return {
      // Response object with relevant data (e.g., created entity information)
    };
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
  },

  async getEntityById(id) {
    const db = new sqlite3.Database('.tmp/data.db', sqlite3.OPEN_READWRITE);

    const entity = await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.get('SELECT * FROM entities WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    });

    db.close();

    return entity;
  },

 async updateEntity(id, data) {
    const db = new sqlite3.Database('.tmp/data.db', sqlite3.OPEN_READWRITE);

    await new Promise((resolve, reject) => {
      db.serialize(() => {
        const stmt = db.prepare('UPDATE entities SET name = ?, description = ?, fields = ? WHERE id = ?');
        stmt.run(data.name, data.description, JSON.stringify(data.fields), id);
        stmt.finalize();

        resolve();
      });
    });

    db.close();

    return {
      // Updated entity data (optional)
    };
  },

  async deleteEntity(id) {
    const db = new sqlite3.Database('.tmp/data.db', sqlite3.OPEN_READWRITE);

    await new Promise((resolve, reject) => {
      db.serialize(() => {
        const stmt = db.prepare('DELETE FROM entities WHERE id = ?');
        stmt.run(id);
        stmt.finalize();

        resolve();
      });
    });

    db.close();

    return {
      // Deleted entity ID (optional)
    };
  },
  // Implement similar logic for retrieving, updating, and deleting entities
};
