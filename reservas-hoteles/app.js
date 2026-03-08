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

function mostrarHoteles(){

hoteles.forEach(hotel=>{

container.innerHTML += `

<div class="col-md-4">

<div class="card mb-4">

<div class="card-body">

<h5>${hotel.nombre}</h5>

<p>Ciudad: ${hotel.ciudad}</p>

<p>Precio: $${hotel.precio}</p>

<button class="btn btn-primary">
Reservar
</button>

</div>

</div>

</div>

`

})

}

mostrarHoteles()