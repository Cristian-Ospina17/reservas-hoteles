export class OpinionFactory {
  static crearOpinion(hotelId, comentario, rating) {
    return {
      hotelId,
      comentario,
      rating: Number(rating)
    };
  }
}