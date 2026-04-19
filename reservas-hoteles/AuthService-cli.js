import db from "./database-cli.js";

export class AuthService {

  // REGISTRAR USUARIO
  registrar(nombre, email, password) {

    if (!nombre || !email || !password) {
      throw new Error("Todos los campos son obligatorios");
    }

    const existe = db.usuarios.find(u => u.email === email);

    if (existe) {
      throw new Error("El correo ya está registrado");
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      email,
      password
    };

    db.usuarios.push(nuevoUsuario);
    db.guardarUsuarios();

    return nuevoUsuario;
  }

  // LOGIN
  login(email, password) {

    const usuario = db.usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!usuario) {
      throw new Error("Credenciales incorrectas");
    }

    return usuario;
  }

  // OBTENER USUARIO ACTUAL (en CLI, no hay sesión)
  obtenerUsuarioActual() {
    return null;
  }

  // GUARDAR SESIÓN (no aplica en CLI)
  guardarSesion(usuario) {
    // No hacer nada
  }

  // CERRAR SESIÓN (no aplica en CLI)
  cerrarSesion() {
    // No hacer nada
  }

  // VALIDAR SI HAY SESIÓN (en CLI, siempre false)
  estaLogueado() {
    return false;
  }

}