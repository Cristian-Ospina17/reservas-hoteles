import { PagoStrategy } from "./PagoStrategy.js";

export class Bancolombia extends PagoStrategy {
  pagar() {
    return "Pagado con Bancolombia";
  }
}