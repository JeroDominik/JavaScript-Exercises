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

const agregarVinos = ({nombre, img, descripcion, precio}) => {

    const container = document.createElement("div")
    container.classList.add("vinos__card")

    const imagen = document.createElement("img")
    const titulo = document.createElement("h2")
    const desc = document.createElement("p")
    const valor = document.createElement("p")
    const btnAgregar = document.createElement("button")
    btnAgregar.classList.add("button__compra")

    imagen.src = img
    imagen.alt = "Imagen Vino" + nombre
    titulo.innerText = nombre
    desc.innerText = descripcion
    valor.innerText = "Precio: $" + precio
    btnAgregar.innerText = "Agregar al Carrito"

    container.append( imagen, titulo, desc, valor, btnAgregar)
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
}


document.addEventListener("DOMContentLoaded", async() => {
    const response = await fetch("./Final_Entrega/data.json")
    const data = await response.json()

    data.forEach( (vino) => {
        agregarVinos(vino)
    })
    actualizarCarrito()
})