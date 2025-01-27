const creadoraHtmlVino = () => {
    let vinos = JSON.parse(localStorage.getItem("vinoSeleccionado"))
    const container = document.getElementById("vinoHtml")

    if(vinos) {

        const tituloVino = document.createElement("h2")
        const descripcionVino = document.createElement("p")
        const imgVino = document.createElement("img")
    
        tituloVino.innerText = vinos.nombre
        descripcionVino.innerText = vinos.descripcion
        imgVino.src = vinos.img
        imgVino.alt = "Imagen Vino" + vinos.nombre
    
        container.append(tituloVino, descripcionVino, imgVino)
    } else {
        container.innerText = "El vino seleccionado no se encuentra disponible en este momento"
    }
    document.title = vinos.nombre
}
creadoraHtmlVino()