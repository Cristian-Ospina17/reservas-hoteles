import db from "../database.js";

export class UsuarioRepository {

  guardar(usuario) {
    db.usuarios.push(usuario);
    db.guardarUsuarios();
  }

  buscarPorEmail(email) {
    return db.usuarios.find(u => u.email === email);
  }

}