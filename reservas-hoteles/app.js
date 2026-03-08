const hoteles = [

{
nombre:"Hotel Caribe Real",
ciudad:"Cartagena",
precio:120,
personasMax:4,
habitaciones:2
},

{
nombre:"Hotel Murallas",
ciudad:"Cartagena",
precio:150,
personasMax:3,
habitaciones:2
},

{
nombre:"Hotel Bocagrande",
ciudad:"Cartagena",
precio:180,
personasMax:5,
habitaciones:3
},

{
nombre:"Hotel Playa Azul",
ciudad:"Santa Marta",
precio:90,
personasMax:4,
habitaciones:2
},

{
nombre:"Hotel Tayrona Beach",
ciudad:"Santa Marta",
precio:130,
personasMax:6,
habitaciones:3
},

{
nombre:"Hotel Sierra Nevada",
ciudad:"Santa Marta",
precio:100,
personasMax:3,
habitaciones:2
},

{
nombre:"Hotel Montaña",
ciudad:"Medellín",
precio:110,
personasMax:4,
habitaciones:2
},

{
nombre:"Hotel Poblado Plaza",
ciudad:"Medellín",
precio:140,
personasMax:5,
habitaciones:3
},

{
nombre:"Hotel Metro Medellín",
ciudad:"Medellín",
precio:95,
personasMax:2,
habitaciones:1
},

{
nombre:"Hotel Pacífico",
ciudad:"Cali",
precio:85,
personasMax:3,
habitaciones:2
},

{
nombre:"Hotel Salsa Resort",
ciudad:"Cali",
precio:120,
personasMax:4,
habitaciones:2
},

{
nombre:"Hotel Valle Real",
ciudad:"Cali",
precio:140,
personasMax:6,
habitaciones:3
}

]

const container = document.getElementById("hotelContainer")
const selectHotel = document.getElementById("hotelSeleccionado")

// API CLIMA

async function obtenerClima(ciudad){

try{

const res = await fetch(`https://wttr.in/${ciudad}?format=%t`)
const clima = await res.text()
return clima

}catch{

return "No disponible"

}

}

// MOSTRAR HOTELES

async function mostrarHoteles(){

container.innerHTML=""

for(const hotel of hoteles){

const clima = await obtenerClima(hotel.ciudad)

container.innerHTML += `

<div class="col-md-4">

<div class="card mb-4 shadow">

<img src="https://source.unsplash.com/400x250/?hotel,${hotel.ciudad}">

<div class="card-body">

<h5>${hotel.nombre}</h5>

<p class="text-muted">${hotel.ciudad}</p>

<p class="precio">$${hotel.precio} / noche</p>

<p>👥 Hasta ${hotel.personasMax} personas</p>

<p>🛏 ${hotel.habitaciones} habitaciones</p>

<p>🌡 Clima: ${clima}</p>

</div>

</div>

</div>

`

}

}

// SELECT HOTELES

function cargarHotelesSelect(){

selectHotel.innerHTML=""

hoteles.forEach(hotel=>{

selectHotel.innerHTML += `
<option value="${hotel.nombre}">
${hotel.nombre} - ${hotel.ciudad}
</option>
`

})

}

// BUSCADOR

document.getElementById("buscador").addEventListener("input",(e)=>{

const texto = e.target.value.toLowerCase()

const filtrados = hoteles.filter(hotel=>

hotel.nombre.toLowerCase().includes(texto) ||
hotel.ciudad.toLowerCase().includes(texto)

)

container.innerHTML=""

filtrados.forEach(hotel=>{

container.innerHTML += `

<div class="col-md-4">

<div class="card mb-4">

<img src="https://source.unsplash.com/400x250/?hotel">

<div class="card-body">

<h5>${hotel.nombre}</h5>

<p>${hotel.ciudad}</p>

<p class="precio">$${hotel.precio}</p>

</div>

</div>

</div>

`

})

})

// FORMULARIO

document.getElementById("formReserva").addEventListener("submit",(e)=>{

e.preventDefault()

const nombre = document.getElementById("nombre").value
const email = document.getElementById("email").value
const hotelNombre = selectHotel.value
const personas = parseInt(document.getElementById("personas").value)
const habitaciones = parseInt(document.getElementById("habitaciones").value)

const hotel = hoteles.find(h=>h.nombre === hotelNombre)

if(personas > hotel.personasMax){

alert("Este hotel no admite tantas personas")
return

}

if(habitaciones > hotel.habitaciones){

alert("Este hotel no tiene tantas habitaciones disponibles")
return

}

alert(`Reserva confirmada en ${hotel.nombre}`)

})

mostrarHoteles()
cargarHotelesSelect()