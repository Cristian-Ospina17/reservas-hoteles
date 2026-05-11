/**
 * Sistema de Notificaciones Mejorado
 * Reemplaza alerts por notificaciones toast más profesionales
 */

export class NotificacionesToast {
  static success(mensaje, duracion = 3000) {
    this.mostrar(mensaje, 'success', duracion);
  }

  static error(mensaje, duracion = 3000) {
    this.mostrar(mensaje, 'danger', duracion);
  }

  static info(mensaje, duracion = 3000) {
    this.mostrar(mensaje, 'info', duracion);
  }

  static mostrar(mensaje, tipo, duracion) {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${tipo}`;
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Animar salida
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duracion);
  }
}

/**
 * Validaciones de Formularios
 */
export class ValidadorFormularios {
  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validarPassword(password) {
    // Mínimo 6 caracteres
    return password.length >= 6;
  }

  static validarFechas(entrada, salida) {
    const dateEntrada = new Date(entrada);
    const dateSalida = new Date(salida);
    return dateSalida > dateEntrada;
  }
}

/**
 * Utilidades de Conversión
 */
export class Utilidades {
  static formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static calcularNoches(entrada, salida) {
    const date1 = new Date(entrada);
    const date2 = new Date(salida);
    const diferencia = date2 - date1;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  static formatearMoneda(cantidad) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(cantidad);
  }
}