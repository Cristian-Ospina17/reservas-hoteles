export class AuthService {

  constructor() {
    this.API_URL = "http://localhost:8080/api/usuarios";
  }

  async registrar(nombre, email, password) {
    const respuesta = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        email,
        password
      })
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo registrar el usuario.");
    }

    return await respuesta.json();
  }

  async login(email, password) {
    const respuesta = await fetch(`${this.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!respuesta.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await respuesta.json();

    const usuario = data.usuario || data;
    const token = data.token || "";

    if (!usuario.rol) {
      usuario.rol = "USER";
    }

    this.guardarSesion(usuario, token);

    return usuario;
  }

  guardarSesion(usuario, token) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    localStorage.setItem("token", token);
  }

  obtenerUsuarioActual() {
    const usuario = localStorage.getItem("usuarioActual");
    return usuario ? JSON.parse(usuario) : null;
  }

  obtenerToken() {
    return localStorage.getItem("token");
  }

  cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("token");
  }

  estaLogueado() {
    return this.obtenerUsuarioActual() !== null;
  }
}