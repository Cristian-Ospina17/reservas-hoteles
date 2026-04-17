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