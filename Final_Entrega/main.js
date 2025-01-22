document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("mostrarCarrito").classList.toggle("carrito__active")
})

let ArrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []


const vinosDOM = document.getElementById("vinosBox")
const vinosCarritoDOM = document.getElementById("mostrarCarrito")
const totalCarrito = document.getElementById("totalCarrito")


const calcularTotalCarrito = () => {
    let total = ArrayCarrito.reduce( (acc, vino) => {
        return acc + vino.precio * vino.cantidad
    }, 0)

    totalCarrito.innerText = "= $" + total
}

const elimnarDeCarrito = () => {
    const botonesEliminar = document.getElementsByClassName("button__eliminar")
    const arrayBotonesEliminar = Array.from(botonesEliminar)
    arrayBotonesEliminar.forEach(buttonDelete => {
        buttonDelete.addEventListener("click", e =>{
            let index = ArrayCarrito.findIndex(vino => vino.nombre == e.target.parentElement.parentElement.children[0].innerText)
            let vinoExiste = ArrayCarrito[index]
            
            if(vinoExiste.cantidad == 1) {
                ArrayCarrito.splice(index, 1)
            }else {
                vinoExiste.cantidad -= 1
            }
            actualizarCarrito()
        })
    })
}

const agregarEnCarrito = () => {
    const botonesAgregar = document.getElementsByClassName("button__agregar")
    const arrayBotonesAgregar = Array.from(botonesAgregar)
    arrayBotonesAgregar.forEach(buttonPlus => {
        buttonPlus.addEventListener("click", e =>{
            let vinoExiste = ArrayCarrito.find(vino => vino.nombre == e.target.parentElement.parentElement.children[0].innerText)
            
            if(vinoExiste.cantidad >= 1) {
                vinoExiste.cantidad += 1
            }
            actualizarCarrito()
        })
    })
}

const vaciarDeCarrito = () => {
    const botonesVaciar = document.getElementsByClassName("button__vaciar")
    const arrayBotonesVaciar = Array.from(botonesVaciar)
    arrayBotonesVaciar.forEach(buttonEmpty => {
        buttonEmpty.addEventListener("click", e =>{
            let index = ArrayCarrito.findIndex(vino => vino.nombre == e.target.parentElement.children[0].innerText)
            let vinoExiste = ArrayCarrito[index]
            
            if(vinoExiste.cantidad >= 1) {
                ArrayCarrito.splice(index, 1)
            }
            actualizarCarrito()
        })
    })
}

const actualizarCarrito = () => {
    vinosCarritoDOM.innerHTML = ("")
    ArrayCarrito.forEach( vino => {
        vinosCarritoDOM.innerHTML += `
            <div class="carrito__card">
                <img src=${vino.img} alt=${vino.nombre}>
                <div class="noMargin">
                    <h2>${vino.nombre}</h2>
                    <p>Precio: $${vino.precio}</p>
                    <div class="carrito__card__cantidades">
                        <button class="button__agregar">+</button>
                        <p>${vino.cantidad}</p>
                        <button class="button__eliminar">-</button>
                    </div>
                    <button class="button__vaciar">Vaciar de Carrito</button>
                </div>
            </div>
        `
    })

    elimnarDeCarrito()
    agregarEnCarrito()
    vaciarDeCarrito()
    calcularTotalCarrito()
    localStorage.setItem("carrito", JSON.stringify(ArrayCarrito))
}

const agregarVinos = ( vinos ) => {
    vinos.forEach( vino => {
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

    arrayBotonesVinos.forEach( vinoButton => {
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
}


document.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("./Final_Entrega/data.json")
    const data = await response.json()

    agregarVinos(data)
    actualizarCarrito()
})