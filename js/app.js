// Js para la comprobación de datos del formulario de entrada // 

// Inicializacion de variables, objetos, DOM, etc.
const nickInput = document.getElementById("nick");
const tamanotInput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");
const error = document.getElementById("error");

//funcion de evento//
function comprobarForm(event) {
    //comprobar cambios//
    if(nickInput.value.match(/(?!\$)[0-9]/)) {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo de nick no puede comenzar con un número";
        return false;
    } else if(tamanotInput.value=="0") {
        tamanotInput.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar un tamaño de panel";
        return false;
    }
    return true;  
}

// Inicio carga de eventos //
formEntrada.addEventListener("submit", comprobarForm);