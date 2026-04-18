export class ContextoPago {

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  ejecutarPago() {
    return this.strategy.pagar();
  }

}