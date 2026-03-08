// =============================
// LISTA DE HOTELES
// =============================

const hoteles = [
{
nombre:"Hotel Caribe",
ciudad:"Cartagena",
precio:120
},
{
nombre:"Hotel Playa",
ciudad:"Santa Marta",
precio:90
},
{
nombre:"Hotel Montaña",
ciudad:"Medellín",
precio:100
}
]

const container = document.getElementById("hotelContainer")

// =============================
// MOSTRAR HOTELES
// =============================

async function mostrarHoteles(){

let html = ""

for (const hotel of hoteles){

const clima = await obtenerClima(hotel.ciudad)

html += `
<div class="col-md-4">
<div class="card mb-4 shadow">

<div class="card-body">

<h5 class="card-title">${hotel.nombre}</h5>

<p>Ciudad: ${hotel.ciudad}</p>

<p>Precio: $${hotel.precio}</p>

<p>Clima actual: ${clima}</p>

<button class="btn btn-primary">
Reservar
</button>

</div>

</div>
</div>
`
}

container.innerHTML = html

}

// =============================
// API CLIMA
// =============================

async function obtenerClima(ciudad){

try{

const respuesta = await fetch(`https://wttr.in/${ciudad}?format=%t`)

const clima = await respuesta.text()

return clima

}catch(error){

return "No disponible"

}

}

mostrarHoteles()

// =============================
// VALIDACION FORMULARIO
// =============================

document.getElementById("formReserva").addEventListener("submit",function(e){

e.preventDefault()

const nombre = document.getElementById("nombre").value.trim()
const email = document.getElementById("email").value.trim()

if(nombre === "" || email === ""){

alert("Complete todos los campos")
return

}

if(!email.includes("@")){

alert("Ingrese un correo válido")
return

}

alert("Reserva realizada con éxito")

})