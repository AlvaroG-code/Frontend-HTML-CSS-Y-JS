//JS Para el juego MasterDots//

//variables globales//
let iniciadoMarcado = false;
let adyacentes = [];
let idMarcador = [];
let classMarcada;
let tamanoPanel;
let idInterval;

//funcion que genera numeros ramdos entre 0 y max//
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//formulario de usuario//
function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
    tamanoPanel = parseInt(tamano);
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
        items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRandom]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

//calcular el array de los adyacentes//
function calcularAdyacentes(idMarcado) {
    adyacentes = [];
    //adyacente superior//
    if((idMarcado-tamanoPanel)>=0) adyacentes.push(idMarcado-tamanoPanel);
    //adyacente superior//
    if((idMarcado+tamanoPanel)<(tamanoPanel*tamanoPanel)) adyacentes.push(idMarcado+tamanoPanel);
    //adyacente izquierdo//
    if((idMarcado%tamanoPanel)>0) adyacentes.push(idMarcado-1);
    //adyacente derecho//
    if(((idMarcado+1)%tamanoPanel)>0) adyacentes.push(idMarcado+1);

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);
    }
}

//funcion de cuenta atras//
function cuentaAtras() {
    let tiempoRestante = parseInt(document.getElementById("tiempo").value)-1;
    document.getElementById("tiempo").value = tiempoRestante;
    if(tiempoRestante==0) {
        clearInterval(idInterval);
        //finalizar todos los eventos//
        const items = document.getElementsByClassName('item');
        for (let item of items) {
            item.removeEventListener('mousedown', comenzarMarcar);
            item.removeEventListener('mouseover', continuarMarcando);
    }
    document.removeEventListener('mouseup', finalizarMarcado);
    //Cambiar z-index paneles//
    document.getElementById("juegoAcabado").classList.add('juegoAcabadoColor');
    document.getElementById("juegoAcabado").style.zIndex = "2";
    document.getElementById("juego").style.zIndex = "1";
    document.getElementById("nuevaPartida").addEventListener("click", (event) => location.reload());
    }
}


//funcion de eventos del raton del juego//
function programarEventosJuego() {
    const items = document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);
    }
    document.addEventListener('mouseup', finalizarMarcado);
    //cuenta atras//
    idInterval =  setInterval(cuentaAtras, 1000);
}

//funciones del juego//
//iniciar el marcado de los dots//
function comenzarMarcar(event) {
    let item = event.target;
    let containerItem = event.target.parentElement;
    if(item.classList.contains('rojo')){
        classMarcada = 'rojo';
        containerItem.classList.add('rojo');
    } 
    else {
        classMarcada = 'verde';
        containerItem.classList.add('verde');
    } 
    if(!iniciadoMarcado) iniciadoMarcado = true;
    
    //comenzar a guardar los id de los marcados//
    idMarcador.push(parseInt(item.id));
    //comienzo a calcular los adyacentes//
    calcularAdyacentes(parseInt(item.id));
    console.log("se ha pinchado");
}

//Evento Mainover//
function continuarMarcando(event) {
    if(iniciadoMarcado) {
        let item = event.target;
        let idNuevo = parseInt(item.id);
        //Es adyacente?//
        if(adyacentes.includes(idNuevo)&&event.target.classList.contains(classMarcada)) {
            let containerItem = event.target.parentElement;
            if(item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde');
            //comenzar a guardar los id de los marcados//
            idMarcador.push(parseInt(item.id));
            calcularAdyacentes(parseInt(item.id));
        }
    
}
    console.log("pasando por el circulo");
}

//Evento Mouseup//
function finalizarMarcado(event) {
    iniciadoMarcado = false;
    adyacentes = [];
    //Sumar la puntuacion//
    const puntuacionInput = document.getElementById("puntuacion")
    if(idMarcador.length>1) {
        puntuacionInput.value = parseInt(puntuacionInput.value)+idMarcador.length;
    }
    //Trabajar con los marcados//
    for (let index = 0; index < idMarcador.length; index++) {
        //capturar el objeto//
        let itemMarcado = document.getElementById(idMarcador[index]);
        //capturar el objeto//
        itemMarcado.parentElement.classList.remove(classMarcada);
        //cambiar el color del objeto automatico//
        let color = ["rojo", "verde"];
        let colorRandom = getRandomInt(2);
        itemMarcado.classList.remove(classMarcada);
        itemMarcado.classList.add(color[colorRandom]);
    }
    idMarcador = [];
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