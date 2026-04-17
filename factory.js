export class HotelFactory {
  static crearHotel(data) {
    return {
      id: Date.now(),
      ...data
    };
  }
}
