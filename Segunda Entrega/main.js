document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("mostrarCarrito").classList.toggle("carrito__active")
})

let ArrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []

const nuestrosVinos = [
    {
        nombre: "Valle del Malbec",
        img: "./assets/vinos/TintoValleDelMalbec.webp",
        descripcion: "Valle del Malbec es un vino Malbec que refleja la riqueza y autenticidad del Valle de Uco.",
        precio: 600,
        id: 1
    },
    {
        nombre: "Sol de Los Andes",
        img: "./assets/vinos/TintoSolDeLosAndes.webp",
        descripcion: "Sol de Los Andes es un vino Cabernet Sauvignon que destaca por su elegancia y carácter.",
        precio: 500,
        id: 2
    },
    {
        nombre: "VdM Reserva",
        img: "./assets/vinos/TintoValleDelMalbecReserva.webp",
        descripcion: "Valle del Malbec, Reserva, es un vino Malbec de carácter sofisticado y profundidad única.",
        precio: 900,
        id: 3
    },
    {
        nombre: "Los Aridos",
        img: "./assets/vinos/BlancoLosAridos.webp",
        descripcion: "Los Áridos es un vino blanco elaborado con uvas Chardonnay que expresa la frescura.",
        precio: 500,
        id: 4
    },
    {
        nombre: "Uco Q",
        img: "./assets/vinos/BlancoUcoQ.webp",
        descripcion: "UcoQ es un vino espumoso, que se distingue por su frescura y complejidad.",
        precio: 700,
        id: 5
    },
    {
        nombre: "OZ",
        img: "./assets/vinos/BlancoOz.webp",
        descripcion: "Oz es un vino espumoso, destacando por su elegancia y frescor",
        precio: 400,
        id: 6
    }
]

const vinosDOM = document.getElementById("vinosBox")
const vinosCarritoDOM = document.getElementById("mostrarCarrito")

const actualizarCarrito = () => {
    vinosCarritoDOM.innerHTML = ("")
    ArrayCarrito.forEach( vino => {
        vinosCarritoDOM.innerHTML += `
            <div class="carrito__card">
                <img src=${vino.img} alt=${vino.nombre}>
                <div class="noMargin">
                    <h2>${vino.nombre}</h2>
                    <p>Precio: $${vino.precio}</p>
                    <p>Cantidad: ${vino.cantidad}</p>
                    <button class="button__eliminar">Eliminar</button>
                </div>
            </div>
        `
    })

    const botonesEliminar = document.getElementsByClassName("button__eliminar")
    const arrayBotonesEliminar = Array.from(botonesEliminar)

    arrayBotonesEliminar.forEach(buttonDelete => {
        buttonDelete.addEventListener("click", e =>{
            let index = ArrayCarrito.findIndex(vino => vino.nombre == e.target.parentElement.children[0].innerText)
            let vinoExiste = ArrayCarrito[index]
            
            if(vinoExiste.cantidad == 1) {
                ArrayCarrito.splice(index, 1)
            }else {
                vinoExiste.cantidad -= 1
            }
            actualizarCarrito()
        })
    })

    localStorage.setItem("carrito", JSON.stringify(ArrayCarrito))
}

nuestrosVinos.forEach( (vino) => {
    vinosDOM.innerHTML += `
        <div class="vinos__card">
            <img  src=${vino.img} alt="Imagen Vino ${vino.nombre}">
            <h2>
                ${vino.nombre}
            </h2>
            <p>${vino.descripcion}</p>
            <p>Precio: $<span>${vino.precio}</span></p>
            <button class="button__compra">Agregar al Carrito</button>
        </div>
    `
})

const botonesVinos = document.getElementsByClassName("button__compra")
const arrayBotonesVinos = Array.from(botonesVinos)

arrayBotonesVinos.forEach(vinoButton => {
    vinoButton.addEventListener("click", e => {
        let vinoExiste = ArrayCarrito.find( vino => vino.nombre ==  e.target.parentElement.children[1].innerText )
        
        if(vinoExiste) {
            vinoExiste.cantidad += 1
        }else {
            ArrayCarrito.push({
                nombre: e.target.parentElement.children[1].innerText,
                cantidad: 1,
                precio: Number(e.target.parentElement.children[3].children[0].innerText),
                img: e.target.parentElement.children[0].src
            })
        }
        actualizarCarrito()
    })
})

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito()
})