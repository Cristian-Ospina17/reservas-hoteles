import { obtenerUsuarioActual, cerrarSesion } from "./auth.js";

const API_URL = "http://localhost:8080/api";

function getToken() {
  return localStorage.getItem("token");
}

function headersJSON() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  };
}

window.verificarAccesoAdmin = function () {
  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  if (usuario.rol !== "ADMIN") {
    alert("No tienes permisos de administrador.");
    window.location.href = "index.html";
    return;
  }

  cargarHotelesAdmin();
};

window.cerrarSesionYRedirigir = function () {
  cerrarSesion();
  localStorage.removeItem("usuarioActual");
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

// ================= HOTELES =================

async function cargarHotelesAdmin() {
  const contenedor = document.getElementById("hotelesAdmin");

  const response = await fetch(`${API_URL}/hoteles`);
  const hoteles = await response.json();

  contenedor.innerHTML = "";

  hoteles.forEach(hotel => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card p-3 h-100">

          <img src="${hotel.imagen || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791'}"
               class="card-img-top mb-3"
               style="height:180px; object-fit:cover;">

          <h5>${hotel.nombre}</h5>

          <p><strong>Ciudad:</strong> ${hotel.ciudad}</p>
          <p><strong>Precio:</strong> $${Number(hotel.precioPorNoche).toLocaleString("es-CO")}</p>
          <p><strong>Categoría:</strong> ${hotel.categoria || "-"}</p>
          <p><strong>Capacidad:</strong> ${hotel.personasMax || "-"} personas</p>
          <p><strong>Habitaciones:</strong> ${hotel.cantidadHabitaciones || "-"}</p>
          <p><strong>Baños:</strong> ${hotel.banos || "-"}</p>

          <button class="btn btn-info mb-2" onclick="gestionarHabitaciones(${hotel.id}, '${hotel.nombre}')">
            Gestionar habitaciones
          </button>

          <button class="btn btn-warning mb-2" onclick="editarHotel(${hotel.id})">
            Editar hotel
          </button>

          <button class="btn btn-danger" onclick="eliminarHotel(${hotel.id})">
            Eliminar hotel
          </button>

        </div>
      </div>
    `;
  });
}

document.getElementById("hotelForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("hotelId").value;
  const caracteristicasTexto = document.getElementById("caracteristicas").value;

  const hotel = {
    nombre: document.getElementById("nombre").value,
    ciudad: document.getElementById("ciudad").value,
    precioPorNoche: Number(document.getElementById("precioPorNoche").value),
    categoria: document.getElementById("categoria").value,

    personasMax: Number(document.getElementById("personasMax").value),
    cantidadHabitaciones: Number(document.getElementById("cantidadHabitaciones").value),
    banos: Number(document.getElementById("banos").value),

    imagen: document.getElementById("imagen").value,
    descripcion: document.getElementById("descripcion").value,
    caracteristicas: caracteristicasTexto
      ? caracteristicasTexto.split(",").map(c => c.trim())
      : []
  };

  if (id) {
    await fetch(`${API_URL}/hoteles/${id}`, {
      method: "PUT",
      headers: headersJSON(),
      body: JSON.stringify(hotel)
    });

    alert("Hotel actualizado correctamente ✅");

  } else {
    await fetch(`${API_URL}/hoteles`, {
      method: "POST",
      headers: headersJSON(),
      body: JSON.stringify(hotel)
    });

    alert("Hotel creado correctamente ✅");
  }

  limpiarFormularioHotel();
  cargarHotelesAdmin();
});

window.editarHotel = async function (id) {
  const response = await fetch(`${API_URL}/hoteles/${id}`);
  const hotel = await response.json();

  document.getElementById("tituloFormulario").innerText = "Editar hotel";
  document.getElementById("hotelId").value = hotel.id;
  document.getElementById("nombre").value = hotel.nombre || "";
  document.getElementById("ciudad").value = hotel.ciudad || "";
  document.getElementById("precioPorNoche").value = hotel.precioPorNoche || "";
  document.getElementById("categoria").value = hotel.categoria || "";

  document.getElementById("personasMax").value = hotel.personasMax || "";
  document.getElementById("cantidadHabitaciones").value = hotel.cantidadHabitaciones || "";
  document.getElementById("banos").value = hotel.banos || "";

  document.getElementById("imagen").value = hotel.imagen || "";
  document.getElementById("descripcion").value = hotel.descripcion || "";

  document.getElementById("caracteristicas").value =
    hotel.caracteristicas ? hotel.caracteristicas.join(", ") : "";

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.eliminarHotel = async function (id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este hotel?");
  if (!confirmar) return;

  await fetch(`${API_URL}/hoteles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  alert("Hotel eliminado correctamente ✅");
  cargarHotelesAdmin();
};

window.limpiarFormularioHotel = function () {
  document.getElementById("tituloFormulario").innerText = "Crear hotel";
  document.getElementById("hotelId").value = "";
  document.getElementById("hotelForm").reset();
};

// ================= HABITACIONES =================

window.gestionarHabitaciones = async function (hotelId, nombreHotel) {
  document.getElementById("panelHabitaciones").style.display = "block";
  document.getElementById("hotelIdHabitacion").value = hotelId;
  document.getElementById("nombreHotelHabitaciones").innerText = nombreHotel;

  await cargarHabitacionesHotel(hotelId);

  document.getElementById("panelHabitaciones").scrollIntoView({
    behavior: "smooth"
  });
};

async function cargarHabitacionesHotel(hotelId) {
  const contenedor = document.getElementById("habitacionesLista");

  const response = await fetch(`${API_URL}/habitaciones/hotel/${hotelId}`);
  const habitaciones = await response.json();

  contenedor.innerHTML = "";

  if (habitaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary">
        Este hotel todavía no tiene habitaciones.
      </div>
    `;
    return;
  }

  habitaciones.forEach(h => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card p-3">

          <h5>Habitación ${h.numero}</h5>

          <p><strong>Categoría:</strong> ${h.categoria}</p>

          <button class="btn btn-danger" onclick="eliminarHabitacion(${h.id}, ${h.hotelId})">
            Eliminar habitación
          </button>

        </div>
      </div>
    `;
  });
}

document.getElementById("habitacionForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const hotelId = Number(document.getElementById("hotelIdHabitacion").value);

  const habitacion = {
    hotelId: hotelId,
    numero: Number(document.getElementById("numeroHabitacion").value),
    categoria: document.getElementById("categoriaHabitacion").value,

    precio: 1,
    disponible: true
  };

  await fetch(`${API_URL}/habitaciones`, {
    method: "POST",
    headers: headersJSON(),
    body: JSON.stringify(habitacion)
  });

  alert("Habitación creada correctamente ✅");

  document.getElementById("habitacionForm").reset();

  await cargarHabitacionesHotel(hotelId);
});

window.eliminarHabitacion = async function (id, hotelId) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta habitación?");
  if (!confirmar) return;

  await fetch(`${API_URL}/habitaciones/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  alert("Habitación eliminada correctamente ✅");

  await cargarHabitacionesHotel(hotelId);
};