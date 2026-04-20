import readline from "readline";
import fs from "fs";
import { AuthService } from "./AuthService-cli.js";
import { hoteles } from "./data.js";
import db from "./database-cli.js";
import { Nequi } from "./Nequi.js";
import { Bancolombia } from "./Bancolombia.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const auth = new AuthService();
let usuarioActual = null;

function pregunta(texto) {
  return new Promise(resolve => {
    rl.question(texto, resolve);
  });
}

// UTILIDAD: Obtener promedio de hotel
function promedioHotel(hotelId) {
  const opiniones = db.opiniones.filter(o => o.hotelId == hotelId);
  if (opiniones.length === 0) return 0;
  const total = opiniones.reduce((sum, o) => sum + o.rating, 0);
  return (total / opiniones.length).toFixed(1);
}

// ============= MENÚ PRINCIPAL =============
async function menuPrincipal() {
  console.log("\n" + "=".repeat(50));
  console.log("🏨 SISTEMA DE RESERVAS DE HOTELES");
  console.log("=".repeat(50));
  if (usuarioActual) {
    console.log(`👤 Usuario: ${usuarioActual.nombre}`);
  }
  console.log("\n1. Registrar usuario");
  console.log("2. Login");
  console.log("3. Ver hoteles disponibles");
  console.log("4. Crear opinión sobre hotel");
  console.log("5. Exportar opiniones a CSV");
  console.log("6. Simular pago");
  console.log("7. Cerrar sesión");
  console.log("8. Salir");

  const opcion = await pregunta("\nOpción: ");
  
  switch(opcion) {
    case "1":
      await registrarUsuario();
      break;
    case "2":
      await loginUsuario();
      break;
    case "3":
      await verHoteles();
      break;
    case "4":
      if (!usuarioActual) {
        console.log("❌ Debes iniciar sesión para crear opiniones");
      } else {
        await crearOpinion();
      }
      break;
    case "5":
      await exportarCSV();
      break;
    case "6":
      await simularPago();
      break;
    case "7":
      usuarioActual = null;
      console.log("✅ Sesión cerrada");
      break;
    case "8":
      console.log("¡Hasta luego! 👋");
      rl.close();
      return;
    default:
      console.log("❌ Opción no válida");
  }

  await menuPrincipal();
}

// ============= REGISTRAR USUARIO =============
async function registrarUsuario() {
  console.log("\n--- Registro de Usuario ---");
  const nombre = await pregunta("Nombre: ");
  const email = await pregunta("Email: ");
  const password = await pregunta("Contraseña: ");

  try {
    auth.registrar(nombre, email, password);
    console.log("✅ Usuario registrado exitosamente");
  } catch (e) {
    console.log("❌ Error: " + e.message);
  }
}

// ============= LOGIN =============
async function loginUsuario() {
  console.log("\n--- Iniciar Sesión ---");
  const email = await pregunta("Email: ");
  const password = await pregunta("Contraseña: ");

  try {
    usuarioActual = auth.login(email, password);
    console.log("✅ ¡Bienvenido " + usuarioActual.nombre + "!");
  } catch (e) {
    console.log("❌ Error: " + e.message);
  }
}

// ============= VER HOTELES =============
async function verHoteles() {
  console.log("\n--- Hoteles Disponibles ---");
  console.log("=".repeat(70));
  
  hoteles.forEach((hotel, index) => {
    const rating = promedioHotel(index);
    console.log(`\n${index + 1}. ${hotel.nombre}`);
    console.log(`   Ubicación: ${hotel.ciudad}`);
    console.log(`   Precio: $${hotel.precio}/noche`);
    console.log(`   Máximo de huéspedes: ${hotel.personasMax}`);
    console.log(`   Descripción: ${hotel.descripcion}`);
    console.log(`   ⭐ Calificación: ${rating || "Sin calificaciones"}`);
    console.log("-".repeat(70));
  });

  await pregunta("\nPresiona Enter para volver...");
}

// ============= CREAR OPINIÓN =============
async function crearOpinion() {
  console.log("\n--- Crear Opinión sobre Hotel ---");
  
  // Mostrar hoteles
  hoteles.forEach((hotel, index) => {
    console.log(`${index}: ${hotel.nombre} (${hotel.ciudad})`);
  });

  const hotelIdStr = await pregunta("\nSelecciona el ID del hotel: ");
  const hotelId = parseInt(hotelIdStr);

  if (isNaN(hotelId) || hotelId < 0 || hotelId >= hoteles.length) {
    console.log("❌ Hotel no válido");
    return;
  }

  const comentario = await pregunta("Comentario: ");
  const ratingStr = await pregunta("Calificación (1-5): ");
  const rating = parseInt(ratingStr);

  if (isNaN(rating) || rating < 1 || rating > 5) {
    console.log("❌ La calificación debe ser entre 1 y 5");
    return;
  }

  try {
    const nuevaOpinion = {
      id: Date.now(),
      hotelId,
      comentario,
      rating,
      usuarioId: usuarioActual.id,
      usuarioNombre: usuarioActual.nombre,
      fecha: new Date().toLocaleDateString()
    };

    db.opiniones.push(nuevaOpinion);
    db.guardarOpiniones();
    console.log("✅ Opinión guardada exitosamente");
  } catch (e) {
    console.log("❌ Error al guardar opinión: " + e.message);
  }
}

// ============= EXPORTAR CSV =============
async function exportarCSV() {
  if (db.opiniones.length === 0) {
    console.log("❌ No hay opiniones para exportar");
    return;
  }

  try {
    let csv = "ID,Hotel,Comentario,Calificación,Usuario,Fecha\n";

    db.opiniones.forEach(o => {
      const hotelNombre = hoteles[o.hotelId] ? hoteles[o.hotelId].nombre : "Desconocido";
      csv += `${o.id},"${hotelNombre}","${o.comentario}",${o.rating},"${o.usuarioNombre}","${o.fecha}"\n`;
    });

    const nombreArchivo = `opiniones_${Date.now()}.csv`;
    fs.writeFileSync(nombreArchivo, csv, 'utf8');
    console.log(`✅ Opiniones exportadas a: ${nombreArchivo}`);
  } catch (e) {
    console.log("❌ Error al exportar CSV: " + e.message);
  }
}

// ============= SIMULAR PAGO =============
async function simularPago() {
  if (!usuarioActual) {
    console.log("❌ Debes iniciar sesión para simular un pago");
    return;
  }

  console.log("\n--- Simular Pago ---");
  
  // Mostrar hoteles
  hoteles.forEach((hotel, index) => {
    console.log(`${index}: ${hotel.nombre} - $${hotel.precio}`);
  });

  const hotelIdStr = await pregunta("\nSelecciona el ID del hotel: ");
  const hotelId = parseInt(hotelIdStr);

  if (isNaN(hotelId) || hotelId < 0 || hotelId >= hoteles.length) {
    console.log("❌ Hotel no válido");
    return;
  }

  const noches = await pregunta("Número de noches: ");
  const hotel = hoteles[hotelId];
  const monto = hotel.precio * parseInt(noches);

  console.log("\n--- Selecciona método de pago ---");
  console.log("1. Nequi");
  console.log("2. Bancolombia");

  const metodoPago = await pregunta("Opción: ");

  try {
    let resultado;
    if (metodoPago === "1") {
      const nequi = new Nequi();
      resultado = nequi.pagar();
    } else if (metodoPago === "2") {
      const bancolombia = new Bancolombia();
      resultado = bancolombia.pagar();
    } else {
      console.log("❌ Método de pago no válido");
      return;
    }

    console.log("\n--- Resumen del Pago ---");
    console.log(`Hotel: ${hotel.nombre}`);
    console.log(`Noches: ${noches}`);
    console.log(`Precio por noche: $${hotel.precio}`);
    console.log(`Monto total: $${monto}`);
    console.log(`Método: ${resultado}`);
    console.log("✅ Pago simulado exitosamente");
  } catch (e) {
    console.log("❌ Error en el pago: " + e.message);
  }
}

// ============= INICIAR APLICACIÓN =============
console.log("🚀 Iniciando sistema de reservas...");
menuPrincipal();