const API_URL = "http://localhost:8080/api";

function getToken() {
  return localStorage.getItem("token");
}

// HOTELES
export async function getHoteles() {
  const response = await fetch(`${API_URL}/hoteles`);
  return await response.json();
}

export async function getHotelPorId(id) {
  const response = await fetch(`${API_URL}/hoteles/${id}`);
  return await response.json();
}

// USUARIOS
export async function crearUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(texto || "No se pudo crear el usuario");
  }

  return await response.json();
}

export async function loginUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(texto || "Credenciales incorrectas");
  }

  return await response.json();
}

// RESERVAS
export async function crearReserva(reserva) {
  const token = getToken();

  const response = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(reserva)
  });

  if (!response.ok) {
    const texto = await response.text();
    console.log("ERROR BACKEND:", texto);
    throw new Error(texto || "No se pudo guardar la reserva");
  }

  return await response.json();
}

export async function getReservas() {
  const token = getToken();

  const response = await fetch(`${API_URL}/reservas`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(texto || "No autorizado para consultar reservas");
  }

  return await response.json();
}

export async function cancelarReserva(id) {
  const token = getToken();

  const response = await fetch(`${API_URL}/reservas/cancelar/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(texto || "No se pudo cancelar la reserva");
  }

  return await response.json();
}