export function guardarOpinion(hotelId, comentario, rating) {
  const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

  opiniones.push({
    hotelId,
    comentario,
    rating: Number(rating)
  });

  localStorage.setItem("opiniones", JSON.stringify(opiniones));
}

export function obtenerOpiniones(hotelId) {
  const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
  return opiniones.filter(o => o.hotelId == hotelId);
}

export function promedioHotel(hotelId) {
  const opiniones = obtenerOpiniones(hotelId);
  if (opiniones.length === 0) return 0;

  const total = opiniones.reduce((sum, o) => sum + o.rating, 0);
  return (total / opiniones.length).toFixed(1);
}

export function topHoteles(hoteles) {
  return hoteles
    .map((h, i) => ({
      ...h,
      id: i,
      rating: promedioHotel(i)
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}