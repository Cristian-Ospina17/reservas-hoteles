import db from "./database.js";
import { OpinionFactory } from "./factory.js";

// GUARDAR OPINIÓN
export function guardarOpinion(hotelId, comentario, rating) {
  const nuevaOpinion = OpinionFactory.crearOpinion(
    hotelId,
    comentario,
    rating
  );

  db.opiniones.push(nuevaOpinion);
  db.guardarOpiniones();
}

// OBTENER OPINIONES
export function obtenerOpiniones(hotelId) {
  return db.opiniones.filter(o => o.hotelId == hotelId);
}

// PROMEDIO DE HOTEL
export function promedioHotel(hotelId) {
  const opiniones = obtenerOpiniones(hotelId);

  if (opiniones.length === 0) return 0;

  const total = opiniones.reduce((sum, o) => sum + o.rating, 0);
  return (total / opiniones.length).toFixed(1);
}

// TOP HOTELES
export function topHoteles(hoteles) {
  return hoteles
    .map((h, i) => ({
      ...h,
      id: i,
      rating: Number(promedioHotel(i))
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

//
// 🔥 AQUI agregas esto (AL FINAL)
//

// EXPORTAR CSV
export function exportarCSV() {

  const opiniones = db.opiniones;

  let csv = "hotelId,comentario,rating\n";

  opiniones.forEach(o => {
    csv += `${o.hotelId},"${o.comentario}",${o.rating}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "opiniones.csv";
  a.click();
}