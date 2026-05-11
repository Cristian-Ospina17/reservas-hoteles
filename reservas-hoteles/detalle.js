import { guardarOpinion, obtenerOpiniones } from "./reviews.js";
import { obtenerUsuarioActual } from "./auth.js";
import { Utilidades } from "./utils.js";
import { getHotelPorId, crearReserva } from "./api.js";

import { ContextoPago } from "./ContextoPago.js";
import { Nequi } from "./Nequi.js";
import { Bancolombia } from "./Bancolombia.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

console.log("ID recibido:", id);

let hotel = null;

async function cargarHotel() {
  try {
    hotel = await getHotelPorId(id);

    if (!hotel || hotel.error) {
      document.body.innerHTML = "<h2>Hotel no encontrado ❌</h2>";
      throw new Error("Hotel no encontrado");
    }

    document.getElementById("nombreHotel").innerText = hotel.nombre;

    document.getElementById("imagenHotel").src =
      hotel.imagen || "https://images.unsplash.com/photo-1564501049412-61c2a3083791";

    document.getElementById("descripcion").innerText =
      hotel.descripcion || "Hotel disponible para reserva.";

    document.getElementById("precioHotel").innerText =
      "$" + Number(hotel.precioPorNoche || 0).toLocaleString("es-CO");

    document.getElementById("capacidadHotel").innerText =
      hotel.personasMax || "8";

    document.getElementById("calificacionHotel").innerText =
      "Sin calificaciones";

    document.getElementById("tipoHotel").innerText =
      hotel.categoria || "Hotel";

    document.getElementById("ubicacionHotel").innerText =
      hotel.ciudad || "No especificada";

    document.getElementById("habitacionesHotel").innerText =
      hotel.cantidadHabitaciones ?? hotel.habitaciones?.length ?? "1";

    document.getElementById("banosHotel").innerText =
      hotel.banos || "3";

    const amenitiesList = document.getElementById("amenitiesHotel");
    amenitiesList.innerHTML = "";

    const servicios = hotel.caracteristicas || [];

    if (servicios.length === 0) {
      amenitiesList.innerHTML = "<li>Sin características registradas</li>";
    } else {
      servicios.forEach(servicio => {
        amenitiesList.innerHTML += `<li>${servicio}</li>`;
      });
    }

    mostrarHabitacionesDelHotel();
    mostrarOpiniones();

  } catch (error) {
    console.error(error);
    alert("No se pudo cargar el hotel desde el backend");
  }
}

function mostrarHabitacionesDelHotel() {
  const contenedorPadre = document.querySelector(".hotel-detalles-adicionales");

  if (!contenedorPadre) return;

  let habitacionesDiv = document.getElementById("listaHabitacionesHotel");

  if (!habitacionesDiv) {
    habitacionesDiv = document.createElement("div");
    habitacionesDiv.id = "listaHabitacionesHotel";
    habitacionesDiv.classList.add("mt-3");
    contenedorPadre.appendChild(habitacionesDiv);
  }

  const habitaciones = Array.isArray(hotel.habitaciones) ? hotel.habitaciones : [];

  if (habitaciones.length === 0) {
    habitacionesDiv.innerHTML = `
      <strong>Habitaciones del hotel:</strong>
      <p>No hay habitaciones registradas para este hotel.</p>
    `;
    return;
  }

  habitacionesDiv.innerHTML = `
    <strong>Habitaciones del hotel:</strong>
    <div class="mt-2">
      ${habitaciones.map(h => `
        <div class="card mb-2 p-2">
          <p><strong>Número:</strong> ${h.numero}</p>
          <p><strong>Categoría:</strong> ${h.categoria}</p>
        </div>
      `).join("")}
    </div>
  `;
}

const hoy = new Date().toISOString().split("T")[0];
document.getElementById("entrada").min = hoy;

document.getElementById("entrada").addEventListener("change", function () {
  document.getElementById("salida").min = this.value;
});

function mostrarOpiniones() {
  const lista = obtenerOpiniones(id);
  const cont = document.getElementById("listaOpiniones");

  cont.innerHTML = "";

  if (lista.length === 0) {
    cont.innerHTML = `<div class="alert alert-secondary">Aún no hay opiniones. Sé el primero en comentar.</div>`;
    return;
  }

  lista.forEach(o => {
    cont.innerHTML += `
      <div class="card mb-2 p-3">
        <div><strong>⭐ ${o.rating}</strong></div>
        <div>${o.comentario}</div>
      </div>
    `;
  });
}

window.enviarOpinion = function () {
  const comentario = document.getElementById("comentario").value;
  const rating = document.getElementById("rating").value;

  if (!comentario.trim()) {
    alert("Por favor escribe un comentario");
    return;
  }

  guardarOpinion(id, comentario, rating);
  document.getElementById("comentario").value = "";
  mostrarOpiniones();
  alert("Opinión guardada");
};

window.mostrarPago = function () {
  const entrada = document.getElementById("entrada").value;
  const salida = document.getElementById("salida").value;

  if (!entrada || !salida) {
    alert("Por favor selecciona fechas");
    return;
  }

  const noches = Utilidades.calcularNoches(entrada, salida);

  if (noches <= 0) {
    alert("La fecha de salida debe ser después de la entrada");
    return;
  }

  const precio = Number(hotel.precioPorNoche || 0);
  const totalPrecio = precio * noches;

  document.getElementById("totalNoches").innerText = noches;
  document.getElementById("totalPrecio").innerText =
    "$" + totalPrecio.toLocaleString("es-CO");

  document.getElementById("resumenReserva").classList.remove("hidden");
  document.getElementById("metodosPago").classList.remove("hidden");
};

window.pagar = async function (metodo) {
  const contexto = new ContextoPago();

  if (metodo === "Nequi") contexto.setStrategy(new Nequi());
  if (metodo === "Bancolombia") contexto.setStrategy(new Bancolombia());

  alert(contexto.ejecutarPago());

  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    alert("Debes iniciar sesión para reservar.");
    return;
  }

  const entrada = document.getElementById("entrada").value;
  const salida = document.getElementById("salida").value;

  if (!entrada || !salida) {
    alert("Selecciona fechas antes de pagar.");
    return;
  }

  try {
    const nuevaReserva = {
      nombreUsuario: usuario.nombre || usuario.email,
      hotel: hotel.nombre,
      fechaEntrada: entrada,
      fechaSalida: salida,
      estado: "ACTIVA"
    };

    const respuesta = await crearReserva(nuevaReserva);

    if (respuesta.error) {
      alert("Error: " + respuesta.error);
      return;
    }

    alert("Reserva guardada exitosamente en MySQL ✅");

  } catch (error) {
    console.error("ERROR REAL:", error);
    alert(error.message || "No se pudo guardar la reserva.");
  }
};

cargarHotel();