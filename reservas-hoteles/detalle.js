import { hoteles } from "./data.js";
import { guardarOpinion, obtenerOpiniones } from "./reviews.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hotel = hoteles[id];

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

window.enviarOpinion = function () {
  const comentario = document.getElementById("comentario").value;
  const rating = document.getElementById("rating").value;

  guardarOpinion(id, comentario, rating);
  mostrarOpiniones();
};

// pago
window.mostrarPago = function(){
  document.getElementById("metodosPago").classList.remove("hidden");
}

window.pagar = function(metodo){
  alert("Pago realizado con " + metodo + " ✅");
}

mostrarOpiniones();