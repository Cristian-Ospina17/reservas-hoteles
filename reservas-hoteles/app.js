import { getHoteles, getReservas, cancelarReserva } from "./api.js";
import { obtenerUsuarioActual, cerrarSesion } from "./auth.js";

const container = document.getElementById("hotelContainer");
const topContainer = document.getElementById("topHoteles");
const reservasContainer = document.getElementById("reservasContainer");

let hotelesBackend = [];

// ==================== HOTELES ====================

export async function mostrarHoteles(lista = null) {
  if (!container) return;

  const hoteles = lista || await getHoteles();
  hotelesBackend = hoteles;

  container.innerHTML = "";

  if (hoteles.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center">
          No se encontraron hoteles con esa búsqueda.
        </div>
      </div>
    `;
    return;
  }

  hoteles.forEach((hotel) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card hotel-card">
          <img src="${hotel.imagen || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791'}">

          <div class="card-body">
            <h5>${hotel.nombre}</h5>
            <p>${hotel.ciudad}</p>

            <p class="precio">
              $${Number(hotel.precioPorNoche).toLocaleString("es-CO")}
            </p>

            <a href="detalle.html?id=${hotel.id}" class="btn btn-primary w-100">
              Ver detalles
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

export async function mostrarTop() {
  if (!topContainer) return;

  const hoteles =
    hotelesBackend.length > 0
      ? hotelesBackend
      : await getHoteles();

  topContainer.innerHTML = "";

  hoteles.slice(0, 3).forEach((hotel) => {
    topContainer.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card hotel-card border-warning">

          <img src="${hotel.imagen || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791'}">

          <div class="card-body text-center">
            <h5>${hotel.nombre}</h5>
            <p>${hotel.ciudad}</p>
          </div>

        </div>
      </div>
    `;
  });
}

// ==================== BUSCADOR ====================

async function configurarBuscador() {
  const buscador = document.getElementById("buscador");
  if (!buscador) return;

  buscador.addEventListener("input", async function () {
    const query = this.value.trim().toLowerCase();

    const hoteles =
      hotelesBackend.length > 0
        ? hotelesBackend
        : await getHoteles();

    const filtrados = query
      ? hoteles.filter(hotel =>
          hotel.nombre.toLowerCase().includes(query) ||
          hotel.ciudad.toLowerCase().includes(query) ||
          hotel.categoria?.toLowerCase().includes(query)
        )
      : hoteles;

    mostrarHoteles(filtrados);
  });
}

// ==================== RESERVAS ====================

export async function mostrarReservas() {
  const usuario = obtenerUsuarioActual();

  if (!reservasContainer) return;

  if (!usuario || !usuario.nombre) {
    reservasContainer.innerHTML = `
      <p class="text-center">
        Inicia sesión para ver tus reservas.
      </p>
    `;
    return;
  }

  try {
    const reservas = await getReservas();

    const reservasUsuario = reservas.filter(
      r =>
        (r.nombreUsuario === usuario.nombre ||
         r.nombreUsuario === usuario.email)
        &&
        r.estado !== "CANCELADA"
    );

    if (reservasUsuario.length === 0) {
      reservasContainer.innerHTML = `
        <div class="alert alert-secondary text-center">
          No tienes reservas activas registradas.
        </div>
      `;
      return;
    }

    reservasContainer.innerHTML = "";

    reservasUsuario.forEach(reserva => {
      reservasContainer.innerHTML += `
        <div class="col-md-6">
          <div class="card mb-3 p-3">

            <h5>${reserva.hotel}</h5>

            <p>
              <strong>Entrada:</strong>
              ${reserva.fechaEntrada}
            </p>

            <p>
              <strong>Salida:</strong>
              ${reserva.fechaSalida}
            </p>

            <p>
              <strong>Estado:</strong>
              <span class="text-success">
                ${reserva.estado}
              </span>
            </p>

            <button class="btn btn-danger w-100"
                    onclick="cancelarReservaDesdeFrontend(${reserva.id})">
              Cancelar reserva
            </button>

          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);

    reservasContainer.innerHTML = `
      <div class="alert alert-danger">
        Error cargando reservas.
      </div>
    `;
  }
}

async function cancelarReservaDesdeFrontend(id) {

  const confirmar = confirm(
    "⚠️ POLÍTICA DE CANCELACIÓN ⚠️\n\n" +

    "• Si cancelas ANTES de 12 horas de la reserva, se hará un cobro del 10% del valor total.\n\n" +

    "• Si cancelas cuando faltan MENOS de 12 horas para la reserva, NO habrá devolución del dinero.\n\n" +

    "• Las reservas se eliminarán automáticamente cuando finalice el tiempo de hospedaje.\n\n" +

    "¿Deseas continuar con la cancelación?"
  );

  if (!confirmar) return;

  try {
    await cancelarReserva(id);
    alert("Reserva cancelada correctamente ✅");
    mostrarReservas();

  } catch (error) {
    console.error(error);
    alert("No se pudo cancelar la reserva.");
  }
}

// ==================== NAVBAR / SESIÓN ====================

export function mostrarInfoUsuario() {
  const usuario = obtenerUsuarioActual();

  const usuarioNav = document.getElementById("usuarioNav");
  const registroNav = document.getElementById("registroNav");
  const reservarNav = document.getElementById("reservarNav");

  if (!usuarioNav || !registroNav) return;

  if (usuario && usuario.nombre && usuario.email) {
    usuarioNav.innerHTML = `
      <span class="nav-link">
        👤 ${usuario.nombre}
      </span>
    `;

    if (usuario.rol === "ADMIN") {
      usuarioNav.innerHTML += `
        <a class="nav-link text-warning" href="admin.html">
          ⚙️ Admin
        </a>
      `;
    }

    registroNav.innerHTML = `
      <a class="nav-link text-danger" href="#" onclick="cerrarSesionYRedirigir()">
        Cerrar sesión
      </a>
    `;

    if (reservarNav) reservarNav.style.display = "block";

  } else {
    usuarioNav.innerHTML = `
      <a class="nav-link" href="login.html">
        Iniciar sesión
      </a>
    `;

    registroNav.innerHTML = `
      <a class="nav-link" href="registro.html">
        Registrarse
      </a>
    `;

    if (reservarNav) reservarNav.style.display = "block";
  }
}

function cerrarSesionYRedirigir() {
  cerrarSesion();
  localStorage.removeItem("usuarioActual");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

window.cerrarSesionYRedirigir = cerrarSesionYRedirigir;
window.cancelarReservaDesdeFrontend = cancelarReservaDesdeFrontend;

// ==================== INICIAR ====================

mostrarInfoUsuario();
mostrarHoteles();
mostrarTop();
mostrarReservas();
configurarBuscador();