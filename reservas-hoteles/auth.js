import { AuthService } from "./AuthService.js";

const authService = new AuthService();

// REGISTRO
export function registrarUsuario(nombre, email, password) {
  try {
    authService.registrar(nombre, email, password);
    alert("Cuenta creada correctamente");
    return true;
  } catch (e) {
    alert(e.message);
    return false;
  }
}

// LOGIN
export function iniciarSesion(email, password) {
  try {
    const usuario = authService.login(email, password);
    authService.guardarSesion(usuario);
    alert("Bienvenido " + usuario.nombre);
    return true;
  } catch (e) {
    alert(e.message);
    return false;
  }
}

// OTROS
export function obtenerUsuarioActual() {
  return authService.obtenerUsuarioActual();
}

export function cerrarSesion() {
  authService.cerrarSesion();
}

export function hayUsuarioLogueado() {
  return authService.estaLogueado();
}

export function verificarAutenticacion() {
  if (!hayUsuarioLogueado()) {
    window.location.href = "login.html";
  }
}

export function redirigirSiLogueado() {
  if (hayUsuarioLogueado()) {
    window.location.href = "index.html";
  }
}

// GLOBAL (para HTML)
window.iniciarSesion = iniciarSesion;
window.registrarUsuario = registrarUsuario;
window.obtenerUsuarioActual = obtenerUsuarioActual;
window.cerrarSesion = cerrarSesion;
window.verificarAutenticacion = verificarAutenticacion;
window.redirigirSiLogueado = redirigirSiLogueado;