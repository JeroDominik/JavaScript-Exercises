document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("mostrarCarrito").classList.toggle("carrito__active")
})

const nuestrosVinos = [
    {
        nombre: "Valle del Malbec",
        img: "./assets/vinos/TintoValleDelMalbec.webp",
        precio: 600,
        id: 1
    },
    {
        nombre: "Sol de Los Andes",
        img: "./assets/vinos/TintoSolDeLosAndes.webp",
        precio: 500,
        id: 2
    },
    {
        nombre: "VdM Reserva",
        img: "./assets/vinos/TintoValleDelMalbecReserva.webp",
        precio: 900,
        id: 3
    },
    {
        nombre: "Los Aridos",
        img: "./assets/vinos/BlancoLosAridos.webp",
        precio: 500,
        id: 4
    },
    {
        nombre: "Uco Q",
        img: "./assets/vinos/UcoQ.webp",
        precio: 700,
        id: 5
    },
    {
        nombre: "OZ",
        img: "./assets/vinos/BlancoOz.webp",
        precio: 400,
        id: 6
    }
]