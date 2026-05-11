class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    this.opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];
    this.reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    this.penalizaciones = JSON.parse(localStorage.getItem('penalizaciones')) || [];

    this.eliminarReservasVencidas();
    Database.instance = this;
  }

  guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  guardarOpiniones() {
    localStorage.setItem('opiniones', JSON.stringify(this.opiniones));
  }

  guardarReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

  guardarPenalizaciones() {
    localStorage.setItem('penalizaciones', JSON.stringify(this.penalizaciones));
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
    this.guardarReservas();
  }

  obtenerReservasPorUsuario(email) {
    return this.reservas.filter(r => r.usuario === email);
  }

  eliminarReservasVencidas() {
    const hoy = new Date();
    const hoyInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    this.reservas = this.reservas.filter(reserva => {
      const salida = new Date(reserva.salida);
      return salida >= hoyInicio;
    });
    this.guardarReservas();
  }

  agregarPenalizacion(monto) {
    this.penalizaciones.push({
      monto: monto,
      fecha: new Date().toISOString()
    });
    this.guardarPenalizaciones();
  }

  obtenerTotalPenalizaciones() {
    return this.penalizaciones.reduce((total, p) => total + p.monto, 0);
  }
}

const db = new Database();
export default db;