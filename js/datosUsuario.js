//JS para la gestión de los datos de usuario//

let nick;
let tamano;
let email;
let geolocalizacionTxt;


//sesionStorage//

function datosUsuario(nick, tamano, email) {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('tamano', tamano.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('geolocalizacionTxt', geolocalizacionTxt);
}

function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    tamano = sessionStorage.getItem('tamano');
    email = sessionStorage.getItem('email');
}

function comprobacionDatosUsuario() {
    if(nick==null) {
        sessionStorage.setItem('error', 'No se ha introducido un nombre de usuario');
        return false;
    }
    return true;
}

//geocalizacion//
function datogeolocalizacion() {
    if(!navigator.geolocation) {
        geolocalizacionTxt = "Geolocalización no soportada por el navegador";
    } else {
        navigator.geolocation.getCurrentPosition(
            //exito//
            (position) => {geolocalizacionTxt = 'Latitud: ' + position.coords.latitude + ' Longitud: ' + position.coords.longitude;},
            //error//
            () => {geolocalizacionTxt = "Geolocalización no soportada por el navegador";}
        )
    }
}

//localStorage// //Guardar historico//
function historicoUsuarios(nick) {
    let historicoStorage = localStorage.getItem('historico');
    let historico;
        if(historicoStorage==null) {
            historico = [];
    } else {
        historico = JSON.parse(historicoStorage);
    }
    let registroUsuario = {
        usuario: nick.value,
        fecha: Date.now(),
    }
    historico.push(registroUsuario);
    localStorage.setItem('historico', JSON.stringify(historico));
}