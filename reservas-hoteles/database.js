class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    this.opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];

    Database.instance = this;
  }

  guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  guardarOpiniones() {
    localStorage.setItem('opiniones', JSON.stringify(this.opiniones));
  }
}

const db = new Database();
export default db;