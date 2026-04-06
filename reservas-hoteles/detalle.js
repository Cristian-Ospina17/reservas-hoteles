import { hoteles } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hotel = hoteles[id];

document.getElementById("nombreHotel").innerText = hotel.nombre;
document.getElementById("imagenHotel").src = hotel.imagen;
document.getElementById("descripcion").innerText = hotel.descripcion;