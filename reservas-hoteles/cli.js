mport readline from "readline";
import { AuthService } from "./AuthService.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const auth = new AuthService();

function menu() {
  console.log("\n1. Registrar usuario");
  console.log("2. Salir");

  rl.question("Opción: ", (op) => {

    if (op === "1") {
      rl.question("Nombre: ", nombre => {
        rl.question("Email: ", email => {
          rl.question("Password: ", password => {

            try {
              auth.registrar(nombre, email, password);
              console.log("Usuario registrado");
            } catch (e) {
              console.log(e.message);
            }

            menu();
          });
        });
      });
    }

    if (op === "2") rl.close();
  });
}

menu();