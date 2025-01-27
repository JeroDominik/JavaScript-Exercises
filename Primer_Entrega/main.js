const Usuarios = [
    {
        correo: "jero@gmail.com",
        nombre: "Jerónimo",
        apellido: "Dominik",
        edad: 28,
        saldo: 1000
    }
]

function validarCorreo(correo) {
    const correoRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return correoRegex.test(correo)
}

function creadoraDeArrayDeCorreos() {
    const ArrayCorreos = []

    for (let i = 0; i < Usuarios.length; i++) {
        ArrayCorreos.push(Usuarios[i].correo)
    }
    return ArrayCorreos
}

function verificarCorreoExiste(correo) {
    const ArrayCorreos = creadoraDeArrayDeCorreos()
    return ArrayCorreos.includes(correo)
}

function crearUsuario(correo, nombre, apellido, edad){
    if((!nombre || !apellido || isNaN(edad) || edad < 18)) {
        alert("Por favor, ingrese sus datos correctamente")
    } else {
        Usuarios.push({
            correo,
            nombre,
            apellido,
            edad,
            saldo: 0,
        })
    }
}

function consultarSaldo(correo) {
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].correo === correo) {
            alert(`Tu saldo es: $${Usuarios[i].saldo}`)
            return
        }
    }
}

function depositarDinero(deposito, correo) {
    if (isNaN(deposito) || deposito <= 0) {
        alert("Por favor, ingresa una cantidad válida.")
        return
    }
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].correo === correo) {
            Usuarios[i].saldo += deposito
            alert(`Depósito exitoso. Tu nuevo saldo es: $${Usuarios[i].saldo}`)
            return
        }
    }
}


function homeBanking(){
    let bandera = true

    while(bandera){
        let opciones = Number(prompt("Bienvenido a Banco Mendoza, que deseas hacer:\n 1-Registrarte\n 2-Consultar tu Saldo \n 3-Depositar Dinero"))
        let correo

        if((opciones != 0)  && (opciones >= 0 && opciones < 4)){
            correo = prompt("Ingresa tu correo:")
        } else {
            alert("Por favor ingrese una opción válida")
            bandera = confirm("¿Desea realizar alguna operación?")
            continue
        }
        if (!validarCorreo(correo)) {
            alert("El correo no es válido. Asegúrate de que tenga un formato correcto, como ejemplo@correo.com")
            continue
        }
        

        switch(opciones){
            case 0:
                return
            case 1:
                if (verificarCorreoExiste(correo)) {
                    alert("Este correo ya se encuentra registrado.")
                } else {
                    let nombre = prompt("Ingrese el nombre del Usuario")
                    let apellido = prompt("Ingrese el apellido del Usuario")
                    let edad = Number(prompt("Ingrese la edad del Usuario. (Para poder Registrarte debes ser mayor de 18 años)"))
                    crearUsuario(correo, nombre, apellido, edad,)
                }
                bandera = confirm("¿Desea realizar alguna otra operación?")
                break
            case 2:
                consultarSaldo(correo)
                bandera = confirm("¿Desea realizar alguna otra operación?")
                break
            case 3:
                if(verificarCorreoExiste(correo)){
                    let deposito = Number(prompt("¿Cuanto dinero desea depositar?"))
                    depositarDinero(deposito, correo)
                }  else {
                    alert("El correo no está registrado.")
                }
                bandera = confirm("¿Desea realizar alguna otra operación?")
                break
            default:
                alert("Por favor ingrese una opción válida")
                bandera = confirm("¿Desea realizar alguna otra operación?")
                break
        }
    }
}
homeBanking()