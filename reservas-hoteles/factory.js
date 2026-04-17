export class HotelFactory {
  static crearHotel(data) {
    return {
      id: Date.now(),
      ...data
    };
  }
}

export class OpinionFactory {
  static crearOpinion(hotelId, comentario, rating) {
    return {
      hotelId,
      comentario,
      rating: Number(rating)
    };
  }
}