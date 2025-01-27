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

const eliminarDeCarrito = ( bttnRestar, nombre ) => {
    bttnRestar.addEventListener("click", () =>{
        let index = ArrayCarrito.findIndex(vino => vino.nombre == nombre)
        let vinoExiste = ArrayCarrito[index]
        
        if(vinoExiste.cantidad == 1) {
            ArrayCarrito.splice(index, 1)
        }else {
            vinoExiste.cantidad -= 1
        }
        actualizarCarrito()
    })
}

const agregarEnCarrito = (bttnSumar, nombre) => {
    bttnSumar.addEventListener("click", () =>{
        let vinoExiste = ArrayCarrito.find(vino => vino.nombre == nombre)
        
        if(vinoExiste.cantidad >= 1) {
            vinoExiste.cantidad += 1
        }
        actualizarCarrito()
    })
}

const vaciarDeCarrito = (bttnVaciarCarrito, nombre) => {
    bttnVaciarCarrito.addEventListener("click", () =>{
        let index = ArrayCarrito.findIndex(vino => vino.nombre == nombre)
        let vinoExiste = ArrayCarrito[index]
        
        if(vinoExiste.cantidad >= 1) {
            ArrayCarrito.splice(index, 1)
        }
        actualizarCarrito()
    })
}

const actualizarCarrito = () => {
    vinosCarritoDOM.innerHTML = ("")

    ArrayCarrito.forEach( ({nombre, precio, img, cantidad}) => {
        const container = document.createElement("div")
        container.classList.add("carrito__card")
    
        const imagen = document.createElement("img")
        imagen.src = img
        imagen.alt = nombre
    
        const containerInfo = document.createElement("div")
        containerInfo.classList.add("noMargin")
    
        const titulo = document.createElement("h2")
        const valor = document.createElement("p")
        titulo.innerText = nombre
        valor.innerText ="Precio: $" + precio
    
        const containerInfoCantidad = document.createElement("div")
        const bttnSumar = document.createElement("button")
        const cantidadDOM = document.createElement("p")
        const bttnRestar = document.createElement("button")
        containerInfoCantidad.classList.add("carrito__card__cantidades")
        cantidadDOM.innerText = cantidad
        bttnSumar.innerText = "+"
        bttnSumar.classList.add("button__agregar")
        bttnRestar.innerText = "-"
        bttnRestar.classList.add("button__eliminar")
    
        const bttnVaciarCarrito = document.createElement("button")
        bttnVaciarCarrito.innerText = "Vaciar Carrito"
        bttnVaciarCarrito.classList.add("button__vaciar")
    
        vinosCarritoDOM.append(container)
        container.append(imagen, containerInfo)
        containerInfo.append(titulo, valor, containerInfoCantidad, bttnVaciarCarrito)
        containerInfoCantidad.append(bttnSumar, cantidadDOM, bttnRestar)
    
    
    
        eliminarDeCarrito(bttnRestar, nombre)
        agregarEnCarrito(bttnSumar, nombre)
        vaciarDeCarrito(bttnVaciarCarrito, nombre)
        calcularTotalCarrito()
        localStorage.setItem("carrito", JSON.stringify(ArrayCarrito))
    })    
}

const agregarVinos = ({nombre, img, descripcion, precio}) => {

    const container = document.createElement("div")
    container.classList.add("vinos__card")

    const imagen = document.createElement("img")
    const titulo = document.createElement("h2")
    const desc = document.createElement("p")
    const valor = document.createElement("p")
    const btnAgregar = document.createElement("button")
    const btnVerMas = document.createElement("a")
    
    imagen.src = img
    imagen.alt = "Imagen Vino" + nombre
    titulo.innerText = nombre
    desc.innerText = descripcion
    valor.innerText = "Precio: $" + precio
    btnAgregar.classList.add("button__compra")
    btnAgregar.innerText = "Agregar al Carrito"
    btnVerMas.classList.add("button__verMas")
    btnVerMas.innerText = "Ver Más"
    btnVerMas.target = "_blank"
    btnVerMas.href = "./Final_Entrega/vinos.html"

    container.append( imagen, titulo, desc, valor, btnAgregar, btnVerMas )
    vinosDOM.append(container)


    btnAgregar.addEventListener("click", () => {
        let vinoExiste = ArrayCarrito.find( vino => vino.nombre ==  nombre )
        
        if(vinoExiste) {
            vinoExiste.cantidad += 1
        }else {
            ArrayCarrito.push({
                nombre: nombre,
                cantidad: 1,
                precio: precio,
                img: img
            })
        }
        actualizarCarrito()
    })

    btnVerMas.addEventListener("click", () => {
        let vinoSeleccionado = {nombre, img, descripcion, precio}
        localStorage.setItem("vinoSeleccionado", JSON.stringify(vinoSeleccionado))
    })
}

document.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("./Final_Entrega/data.json")
    const data = await response.json()

    data.forEach( vino => {
        agregarVinos(vino)
    })
    actualizarCarrito()
})