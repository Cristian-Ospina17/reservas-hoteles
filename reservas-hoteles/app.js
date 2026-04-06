import { hoteles } from "./data.js";

const container = document.getElementById("hotelContainer");

function mostrarHoteles(lista = hoteles) {
  container.innerHTML = "";

  lista.forEach((hotel, index) => {
    container.innerHTML += `
    <div class="col-md-4">
      <div class="card mb-4 shadow">
        <img src="${hotel.imagen}">
        <div class="card-body">
          <h5>${hotel.nombre}</h5>
          <p>${hotel.ciudad}</p>
          <p>${hotel.personasMax} huéspedes</p>
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

// BUSCADOR
document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = hoteles.filter(h =>
    h.nombre.toLowerCase().includes(texto) ||
    h.ciudad.toLowerCase().includes(texto)
  );

  mostrarHoteles(filtrados);
});

mostrarHoteles();