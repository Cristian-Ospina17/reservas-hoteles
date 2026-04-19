import { hoteles } from "./data.js";
import { guardarOpinion, obtenerOpiniones, exportarCSV } from "./reviews.js";

// obtener id
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")); // 🔥 convertir a número

console.log("ID recibido:", id);

// obtener hotel
const hotel = hoteles[id];

// 🔥 VALIDACIÓN (CLAVE)
if (!hotel) {
  document.body.innerHTML = "<h2>Hotel no encontrado ❌</h2>";
  throw new Error("Hotel undefined");
}

// cargar info
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

// strategy (lo de pagos está bien)
import { ContextoPago } from "./ContextoPago.js";
import { Nequi } from "./Nequi.js";
import { Bancolombia } from "./Bancolombia.js";

window.pagar = function (metodo) {

  const contexto = new ContextoPago();

  if (metodo === "Nequi") contexto.setStrategy(new Nequi());
  if (metodo === "Bancolombia") contexto.setStrategy(new Bancolombia());

  alert(contexto.ejecutarPago() + " ✅");
};

// CSV
document.getElementById("btnCSV")
  .addEventListener("click", exportarCSV);

// iniciar
mostrarOpiniones();