import { PagoStrategy } from "./PagoStrategy.js";

export class Nequi extends PagoStrategy {
  pagar() {
    return "Pagado con Nequi";
  }
}