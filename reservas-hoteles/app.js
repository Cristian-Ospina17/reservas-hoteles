import { hoteles } from "./data.js";
import { promedioHotel } from "./reviews.js";

const container = document.getElementById("hotelContainer");

function mostrarHoteles(lista = hoteles) {
  container.innerHTML = "";

  lista.forEach((hotel, index) => {
    const rating = promedioHotel(index);

    container.innerHTML += `
    <div class="col-md-4">
      <div class="card hotel-card">
        <div class="img-container">
          <img src="${hotel.imagen}">
        </div>

        <div class="card-body">
          <h5>${hotel.nombre}</h5>
          <p>${hotel.ciudad}</p>
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

// buscador
document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = hoteles.filter(h =>
    h.nombre.toLowerCase().includes(texto) ||
    h.ciudad.toLowerCase().includes(texto)
  );

  mostrarHoteles(filtrados);
});

mostrarHoteles();