import db from "./database.js";

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

  // OBTENER USUARIO ACTUAL
  obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual"));
  }

  // GUARDAR SESIÓN
  guardarSesion(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
  }

  // CERRAR SESIÓN
  cerrarSesion() {
    localStorage.removeItem("usuarioActual");
  }

  // VALIDAR SI HAY SESIÓN
  estaLogueado() {
    return this.obtenerUsuarioActual() !== null;
  }

}