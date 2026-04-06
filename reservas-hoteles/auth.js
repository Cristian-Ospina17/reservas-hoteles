// Funciones de autenticación con localStorage

// Guardar nuevo usuario
function registrarUsuario(nombre, email, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Validar que el email no exista
  if (usuarios.some(u => u.email === email)) {
    alert('El email ya está registrado');
    return false;
  }
  
  // Validar campos no vacíos
  if (!nombre || !email || !password) {
    alert('Por favor completa todos los campos');
    return false;
  }
  
  // Crear nuevo usuario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    email: email,
    password: password, // En producción usar hash
    fechaRegistro: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('✓ Cuenta creada exitosamente. Ahora inicia sesión.');
  return true;
}

// Login
function iniciarSesion(email, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  
  if (usuario) {
    // Guardar sesión activa
    localStorage.setItem('usuarioActual', JSON.stringify({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    }));
    alert('✓ Bienvenido ' + usuario.nombre + '!');
    return true;
  } else {
    alert('✗ Email o contraseña incorrectos');
    return false;
  }
}

// Obtener usuario actual
function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioActual')) || null;
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  alert('✓ Sesión cerrada correctamente');
}

// Verificar si hay sesión activa
function hayUsuarioLogueado() {
  return obtenerUsuarioActual() !== null;
}

// Redirigir si no está logueado
function verificarAutenticacion() {
  if (!hayUsuarioLogueado()) {
    window.location.href = 'login.html';
  }
}

// Redirigir si ya está logueado
function redirigirSiLogueado() {
  if (hayUsuarioLogueado()) {
    window.location.href = 'index.html';
  }
}
