# reservas-hoteles
# 🏨 Backend - Sistema de Reservas de Hoteles

## 📌 Descripción

Este proyecto corresponde al desarrollo del backend de un sistema de reservas de hoteles, implementado con **Spring Boot** siguiendo una arquitectura por capas:

* Controller
* Service
* Repository
* Model
* Config

Se implementan patrones de diseño como:

* Singleton (configuración)
* Factory (creación de reservas)

---
# StayEase - Sistema de Reservas de Hoteles

## Descripción

StayEase es un frontend de reservas de hoteles creado con HTML, CSS y JavaScript moderno. Ofrece búsqueda de hoteles, visualización de detalles, gestión de reservas y autenticación de usuarios.

## Características principales

- Listado de hoteles y hoteles destacados
- Buscador por nombre, ciudad o categoría
- Detalle de hotel con selección de fechas, cálculo de noches y total
- Pago simulado con selección de método
- Registro e inicio de sesión de usuarios
- Visualización y cancelación de reservas
- Panel de administración para crear y editar hoteles, y gestionar habitaciones
- Notificaciones y validación de formularios
## Estructura del proyecto

- index.html: Página principal del frontend
- detalle.html: Página de detalle de hotel y reserva
- login.html: Página de inicio de sesión
- registro.html: Página de registro de usuarios
- admin.html: Panel administrativo para usuarios con role admin
- style.css: Estilos globales
- detalle.css: Estilos específicos de la página de detalle
- app.js: Lógica principal de la página de inicio
- detalle.js: Lógica de la página de detalle de hotel
- auth.js: Gestión del flujo de autenticación y sesión en el frontend
- api.js: Consumo de endpoints del backend
- AuthService.js: Servicio de autenticación local
- utils.js: Utilidades de notificaciones, validación y formato
## Requisitos

- Backend compatible ejecutándose en http://localhost:8080/api
- Navegador moderno con soporte para módulos ES6
- Servidor estático para servir los archivos (recomendado)
## Cómo usar

1. Asegúrate de tener el backend en ejecución en http://localhost:8080/api.
2. Sirve el directorio reservas-hoteles con un servidor estático.

Opciones recomendadas:

- VS Code + Live Server
- npx serve . desde la carpeta reservas-hoteles
- python -m http.server 5500 desde la carpeta reservas-hoteles
3. Abre http://localhost:5500 o la URL proporcionada por tu servidor.
4. Navega en la app para buscar hoteles, iniciar sesión, reservar y administrar datos.
## Páginas disponibles

- index.html: Explora hoteles, busca por palabra clave y ve reservas activas.
- detalle.html: Muestra información detallada del hotel, permite seleccionar fechas y reservar.
- login.html: Inicia sesión con un usuario existente.
- registro.html: Registra una nueva cuenta de usuario.
- admin.html: Panel de administración para crear y editar hoteles y habitaciones.
## Integración con el backend

El frontend hace peticiones a http://localhost:8080/api para:

- Obtener hoteles: GET /hoteles
- Obtener hotel por ID: GET /hoteles/{id}
- Crear usuario: POST /usuarios
- Login de usuario: POST /usuarios/login
- Crear reserva: POST /reservas
- Obtener reservas: GET /reservas
- Cancelar reserva: PUT /reservas/cancelar/{id}
El backend debe exponer estos endpoints y manejar tokens JWT para el flujo de reservas y autenticación.
## Notas

- Si se abre el proyecto con file://, algunos navegadores pueden bloquear la carga de módulos ES6. Usa un servidor local.
- Las dependencias de UI se cargan desde CDN: Bootstrap 5 y Bootstrap Icons.
- El frontend usa localStorage para almacenar el token de sesión.