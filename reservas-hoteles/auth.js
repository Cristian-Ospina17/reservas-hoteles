import { AuthService } from "./AuthService.js";
import { ValidadorFormularios } from "./utils.js";

const authService = new AuthService();

export async function registrarUsuario(nombre, email, password) {
  if (!nombre || nombre.trim().length < 3) {
    throw new Error("El nombre debe tener al menos 3 caracteres");
  }

  if (!ValidadorFormularios.validarEmail(email)) {
    throw new Error("El email no es válido");
  }

  if (!ValidadorFormularios.validarPassword(password)) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  return await authService.registrar(nombre, email, password);
}

export async function iniciarSesion(email, password) {
  if (!email || !password) {
    throw new Error("Email y contraseña requeridos");
  }

  return await authService.login(email, password);
}

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
  const usuario = obtenerUsuarioActual();

  if (usuario) {
    if (usuario.rol === "ADMIN") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  }
}

window.iniciarSesion = iniciarSesion;
window.registrarUsuario = registrarUsuario;
window.obtenerUsuarioActual = obtenerUsuarioActual;
window.cerrarSesion = cerrarSesion;
window.verificarAutenticacion = verificarAutenticacion;
window.redirigirSiLogueado = redirigirSiLogueado;