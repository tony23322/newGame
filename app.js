const limiteInf = 1;
const limiteSup = 4;
const tamanio = limiteSup-limiteInf+1;
const limiteIntentos = 5;
let listaNumerosSorteados = new Array(tamanio);
let listaNumeros = [];

let actualNumber = -1;
let intentos = 0;
let numeroSecreto;

generarNumerosSecretos();
nuevoJuego();
//let numeroSecreto = generarNumeroSecreto(limiteInf, limiteSup);
//console.log(numeroSecreto);

//TO_HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

function enabledNuevoJuego() {
    document.getElementById('reiniciar').removeAttribute('disabled');
    //document.getElementById('reiniciar').setAttribute('disabled', 'false');
}

function disblaedNuevoJuego() {
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

//MATHS
function getRandomNumber() {
    return Math.floor(Math.random() * limiteSup) +  limiteInf;
}

function generarNumerosSecretos() {
    for(let i = 0; i < tamanio; i++) {
        while (true) {
            let numeroGenerado = getRandomNumber();
            let index = numeroGenerado % tamanio;
            if (listaNumerosSorteados[index] == undefined){
                listaNumerosSorteados[index] = true;
                listaNumeros.push(numeroGenerado);
                break;
            }
        }
    }
}

//GAME
function nuevoJuego() {
    limpiarCaja();
    if (actualNumber == (tamanio - 1)) {
        asignarTextoElemento('p', `Has adivinado todos los numeros generados\nFELICIDADES!!!`);
        disblaedNuevoJuego();
        return;
    }
    asignarTextoElemento('p', `Indica un numero del ${limiteInf} al ${limiteSup}`);
    intentos = limiteIntentos;
    actualNumber++;
    numeroSecreto = listaNumeros[actualNumber];
    console.log('el nnumero secerto es:',numeroSecreto);
    console.log(listaNumeros);
    disblaedNuevoJuego();
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos--;
    console.log(numeroDeUsuario == numeroSecreto, numeroDeUsuario, numeroSecreto); 
    if (numeroDeUsuario == numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el numero\nINTENTOS: ${limiteIntentos - intentos}`);
        enabledNuevoJuego();
        return;
    }
    else if (numeroDeUsuario > numeroSecreto)
        asignarTextoElemento('p', 'El numero secreto es menor');
    else
        asignarTextoElemento('p', 'El numero secreto es mayor');

    if (intentos == 0){
        alert("Mas suerte a la siguiente\nINICIANDO NUEVO JUEGO");
        enabledNuevoJuego();
    }
    limpiarCaja();
    console.log(intentos);
}

asignarTextoElemento('h1', 'JUEGO DEL NUMERO SECRETO');