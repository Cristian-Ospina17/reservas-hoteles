import db from "./database.js";

// REGISTRAR USUARIO
export function registrarUsuario(nombre, email, password) {

  if (!nombre || !email || !password) {
    alert('Completa todos los campos');
    return false;
  }

  if (db.usuarios.some(u => u.email === email)) {
    alert('El email ya está registrado');
    return false;
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    email,
    password
  };

  db.usuarios.push(nuevoUsuario);
  db.guardarUsuarios();

  alert('Cuenta creada correctamente');
  return true;
}

// LOGIN
export function iniciarSesion(email, password) {

  const usuario = db.usuarios.find(
    u => u.email === email && u.password === password
  );

  if (usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    alert('Bienvenido ' + usuario.nombre);
    return true;
  }

  alert('Datos incorrectos');
  return false;
}

// OBTENER USUARIO
export function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioActual'));
}

// CERRAR SESIÓN
export function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
}

// VERIFICAR SI HAY USUARIO
export function hayUsuarioLogueado() {
  return obtenerUsuarioActual() !== null;
}

// PROTEGER RUTAS
export function verificarAutenticacion() {
  if (!hayUsuarioLogueado()) {
    window.location.href = 'login.html';
  }
}

// REDIRIGIR SI YA ESTÁ LOGUEADO
export function redirigirSiLogueado() {
  if (hayUsuarioLogueado()) {
    window.location.href = 'index.html';
  }
}