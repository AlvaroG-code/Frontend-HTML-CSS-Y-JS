//JS Para el juego MasterDots//

//variables globales//
let iniciadoMarcado = false;

//funcion que genera numeros ramdos entre 0 y max//
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//formulario de usuario//
function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
}

//cargar el tamaño del juego//
function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = "repeat("+tamano+", 1fr)";
    document.getElementById("juego").style.gridTemplateRows = "repeat("+tamano+", 1fr)";
    //pintar los puntos de forma automatica//
    let items = "";
    let color = ["rojo", "verde"];
    let colorRandom = 0;
    for (let index = 0; index < (parseInt(tamano)*parseInt(tamano)); index++) {
        if(index%2>0) colorRandom = getRandomInt(2);
        items += `<div class="containerItem"><div class="item ${color[colorRandom]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

//funcion de eventos del raton del juego//
function programarEventosJuego() {
    const items = document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);
    }
    document.addEventListener('mouseup', finalizarMarcado);
}

//funciones del juego//
//iniciar el marcado de los dots//
function comenzarMarcar(event) {
    let item = event.target;
    let containerItem = event.target.parentElement;
    if(item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');
    if(!iniciadoMarcado) iniciadoMarcado = true;
    console.log("se ha pinchado");
}

//Evento Mainover//
function continuarMarcando(event) {
    if(iniciadoMarcado) {
    let item = event.target;
    let containerItem = event.target.parentElement;
    if(item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');
    }
    console.log("pasando por el circulo");
}

//Evento Mouseup//
function finalizarMarcado(event) {
    iniciadoMarcado = false;
    console.log("se ha soltado");
}



//Capturamos datos del usuario//
getDatosUsuario();
//Comprobamos los datos//
if(!comprobacionDatosUsuario()) {
    window.location.href = "index.html";
}

//rellenamos el formulario//
rellenarFormularioUsuario();
pintarPanelJuego();
programarEventosJuego();