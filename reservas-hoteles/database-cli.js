import fs from 'fs';

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    try {
      this.usuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'));
    } catch {
      this.usuarios = [];
    }
    try {
      this.opiniones = JSON.parse(fs.readFileSync('opiniones.json', 'utf8'));
    } catch {
      this.opiniones = [];
    }

    Database.instance = this;
  }

  guardarUsuarios() {
    fs.writeFileSync('usuarios.json', JSON.stringify(this.usuarios));
  }

  guardarOpiniones() {
    fs.writeFileSync('opiniones.json', JSON.stringify(this.opiniones));
  }
}

const db = new Database();
export default db;