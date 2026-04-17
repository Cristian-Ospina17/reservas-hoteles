import { hoteles } from "./data.js";
import { guardarOpinion, obtenerOpiniones, exportarCSV } from "./reviews.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hotel = hoteles[id];

// cargar info del hotel
document.getElementById("nombreHotel").innerText = hotel.nombre;
document.getElementById("imagenHotel").src = hotel.imagen;
document.getElementById("descripcion").innerText = hotel.descripcion;

// opiniones
function mostrarOpiniones() {
  const lista = obtenerOpiniones(id);
  const cont = document.getElementById("listaOpiniones");

  cont.innerHTML = "";

  lista.forEach(o => {
    cont.innerHTML += `<div>⭐${o.rating} - ${o.comentario}</div>`;
  });
}

// enviar opinión
window.enviarOpinion = function () {
  const comentario = document.getElementById("comentario").value;
  const rating = document.getElementById("rating").value;

  guardarOpinion(id, comentario, rating);
  mostrarOpiniones();
};

// pago
window.mostrarPago = function () {
  document.getElementById("metodosPago").classList.remove("hidden");
};

window.pagar = function (metodo) {
  alert("Pago realizado con " + metodo + " ✅");
};

// 🔥 BOTÓN CSV (FORMA PRO)
document.getElementById("btnCSV")
  .addEventListener("click", exportarCSV);

// inicializar
mostrarOpiniones();