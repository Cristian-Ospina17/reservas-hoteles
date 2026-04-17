import { hoteles } from "./data.js";
import { promedioHotel, topHoteles } from "./reviews.js";

const container = document.getElementById("hotelContainer");
const topContainer = document.getElementById("topHoteles");

// mostrar hoteles
function mostrarHoteles(lista) {
  container.innerHTML = "";

  lista.forEach((hotel, index) => {
    const rating = promedioHotel(index);

    container.innerHTML += `
    <div class="col-md-4">
      <div class="card hotel-card">
        <img src="${hotel.imagen}">
        <div class="card-body">
          <h5>${hotel.nombre}</h5>
          <p>${hotel.ciudad}</p>
          <p>${hotel.personasMax} huéspedes</p>
          <p>⭐ ${rating || "Sin calificar"}</p>
          <p class="precio">$${hotel.precio}</p>

          <a href="detalle.html?id=${index}" class="btn btn-primary w-100">
            Ver detalles
          </a>
        </div>
      </div>
    </div>
    `;
  });
}

// TOP
function mostrarTop() {
  const top = topHoteles(hoteles);

  top.forEach(h => {
    topContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card hotel-card border-warning">
          <img src="${h.imagen}">
          <div class="card-body text-center">
            <h5>${h.nombre}</h5>
            <p>⭐ ${h.rating}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// BUSCADOR con fechas
document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = hoteles.filter(h =>
    h.nombre.toLowerCase().includes(texto) ||
    h.ciudad.toLowerCase().includes(texto)
  );

  mostrarHoteles(filtrados);
});

mostrarHoteles(hoteles);
mostrarTop();