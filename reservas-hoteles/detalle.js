const hoteles = [

{nombre:"Hotel Caribe Real",imagen:"https://images.unsplash.com/photo-1564501049412-61c2a3083791",descripcion:"Hermoso hotel frente al mar con piscina y restaurante. Perfecto para vacaciones en Cartagena."},

{nombre:"Hotel Murallas",imagen:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",descripcion:"Hotel cerca del centro histórico con vista a las murallas y excelente ubicación."},

{nombre:"Hotel Bocagrande",imagen:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",descripcion:"Hotel moderno en Bocagrande con habitaciones amplias y piscina panorámica."},

{nombre:"Hotel Playa Azul",imagen:"https://images.unsplash.com/photo-1501117716987-c8e1ecb210b9",descripcion:"Alojamiento frente a la playa en Santa Marta con ambiente relajante."},

{nombre:"Hotel Tayrona Beach",imagen:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",descripcion:"Hotel cerca del Parque Tayrona con naturaleza y paisajes increíbles."},

{nombre:"Hotel Montaña",imagen:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",descripcion:"Hotel en Medellín rodeado de naturaleza y vistas espectaculares."},

{nombre:"Hotel Poblado Plaza",imagen:"https://images.unsplash.com/photo-1568495248636-6432b97bd949",descripcion:"Hotel moderno en El Poblado cerca de restaurantes y vida nocturna."},

{nombre:"Hotel Pacífico",imagen:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461",descripcion:"Hotel cómodo en Cali con excelente relación precio calidad."},

{nombre:"Hotel Valle Real",imagen:"https://images.unsplash.com/photo-1584132967334-10e028bd69f7",descripcion:"Hotel tranquilo en Cali ideal para descansar y disfrutar la ciudad."},

{nombre:"Hotel Amazonía",imagen:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",descripcion:"Experiencia única en la selva amazónica con tours ecológicos."},

{nombre:"Hotel Nevado",imagen:"https://images.unsplash.com/photo-1590490360182-c33d57733427",descripcion:"Hotel en Manizales con vista a las montañas y clima agradable."},

{nombre:"Hotel Colonial",imagen:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",descripcion:"Hotel colonial en Villa de Leyva con arquitectura histórica."}

]

const params = new URLSearchParams(window.location.search)

const id = params.get("id")

document.getElementById("nombreHotel").innerText = hoteles[id].nombre

document.getElementById("imagenHotel").src = hoteles[id].imagen

document.getElementById("descripcion").innerText = hoteles[id].descripcion