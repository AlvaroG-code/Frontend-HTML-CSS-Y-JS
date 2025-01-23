// Js para la comprobación de datos del formulario de entrada // 

// Inicializacion de variables, objetos, DOM, etc.
let nickInput;
let tamanotInput;
let emailInput;
let formEntrada;
let error;
let avatarItems;
let itemImg;
let avatarContainer;



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
     //informacion es correcta//
    datosUsuario(nickInput, tamanotInput, emailInput);
    historicoUsuarios(nickInput);
    return true;  
}
//funcion de evento drag and drop//
function moviendoImg(event) {
    itemImg = event.target;
    console.log(itemImg.src);
    
}
//funcion cambiar imagen//
function cambiarImg(event) {
    avatarContainer.src = itemImg.src;
}


//carga de objetos del Dom, comprovaciones y eventos del formulario//
function domCargado() {
    //Captura de todos los Elementos necesarios//
    nickInput = document.getElementById("nick");
    tamanotInput = document.getElementById("tamano");
    emailInput = document.getElementById("email");
    formEntrada = document.getElementById("formEntrada");
    error = document.getElementById("error");

    //comprobar si hay algun error en la sesion de game.html//
    if(sessionStorage.getItem('error')!=null) {
        error.innerText=sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    formEntrada.addEventListener("submit", comprobarForm);

    avatarItems = document.getElementsByClassName("avatarImgItem");
    //Eventos del drag and drop//
    for(let item of avatarItems) {
        item.addEventListener("dragstart", moviendoImg);
    }
    avatarContainer = document.getElementById("avatarImg");
    avatarContainer.addEventListener("dragover", event => {event.preventDefault()});
    avatarContainer.addEventListener("drop", cambiarImg)    
    };



// Inicio carga de eventos //
document.addEventListener('DOMContentLoaded', domCargado);

// geolocation//
datogeolocalizacion();