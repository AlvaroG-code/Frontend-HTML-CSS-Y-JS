//JS Para el juego MasterDots//

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

//Capturamos datos del usuario//
getDatosUsuario();
//Comprobamos los datos//
if(!comprobacionDatosUsuario()) {
    window.location.href = "index.html";
}

//rellenamos el formulario//
rellenarFormularioUsuario();
pintarPanelJuego();