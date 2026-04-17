// Guardar nuevo usuario
function registrarUsuario(nombre, email, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.email === email)) {
    alert('El email ya está registrado');
    return false;
  }

  if (!nombre || !email || !password) {
    alert('Completa todos los campos');
    return false;
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    email,
    password
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cuenta creada correctamente');
  return true;
}

// Login
function iniciarSesion(email, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuario = usuarios.find(
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

function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioActual'));
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
}

function hayUsuarioLogueado() {
  return obtenerUsuarioActual() !== null;
}

function verificarAutenticacion() {
  if (!hayUsuarioLogueado()) {
    window.location.href = 'login.html';
  }
}

function redirigirSiLogueado() {
  if (hayUsuarioLogueado()) {
    window.location.href = 'index.html';
  }
}