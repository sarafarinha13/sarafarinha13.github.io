console.log("JS CONECTADO");
/* TRAERSE VARIABLES DE OTRO SCRIPT */
let nombre_usuario = localStorage.getItem("nombre_usuario");

const nombre_jugador = document.querySelector("#nombre_jugador");
nombre_jugador.textContent = nombre_usuario;

const salir_juego = document.querySelector("#salir_juego");

salir_juego.addEventListener("click", function(){
    localStorage.removeItem("nombre_usuario");
});


/* LLAMAR ELEMENTOS DEL HTML */
const piedra = document.querySelector("#piedra");
const papel = document.querySelector("#papel");
const tijera = document.querySelector("#tijera");

const puntos_jugador = document.querySelector("#puntos_jugador");
const puntos_pc = document.querySelector("#puntos_pc");
const puntos_empate = document.querySelector("#puntos_empate");

let contador_empate = 0;
let contador_jugador = 0;
let contador_pc = 0;

/* VARIABLES JS */
let respuesta_pc = "";
let opciones_pc = ["piedra", "papel", "tijera"];
let opciones_img = ["img/p.png", "img/pa.png", "img/t.png"];


let respuesta_usuario = "";
let num;


/* -----CREAR BOTÓN DEL PC----- */
const contenedor_pc = document.querySelector("#contenedor_pc");

const boton_pc = document.createElement("button");
const img_pc = document.createElement("img");

contenedor_pc.appendChild(boton_pc);
boton_pc.appendChild(img_pc);

img_pc.classList.add("img_juego");
boton_pc.classList.add("boton_juego");


img_pc.src ="img/predeterminado.png";



/* RESPUESTA PC TRAS ELEGIR RESPUESTA USUARIO piedra = boton | "piedra" = respuesta*/
piedra.addEventListener("click", function(){
    guardar_respuesta_usuario("piedra");
    generarRespuesta_pc();
    comprobarResultado(respuesta_usuario, respuesta_pc);
});

papel.addEventListener("click", function(){
    guardar_respuesta_usuario("papel");
    generarRespuesta_pc();
    comprobarResultado(respuesta_usuario, respuesta_pc);
});

tijera.addEventListener("click", function(){
    guardar_respuesta_usuario("tijera");
    generarRespuesta_pc();
    comprobarResultado(respuesta_usuario, respuesta_pc);
});


/* Funcion que reciba la respuesta del usuario  */
function guardar_respuesta_usuario(opcion){
    respuesta_usuario = opcion;
    console.log(respuesta_usuario);
    
};


/* funcion que genera indice respuesta pc */
function generarRespuesta_pc(){

    num = Math.floor(Math.random()*3);
    respuesta_pc = opciones_pc[num];
    img_pc.src = opciones_img[num];
    
    console.log(respuesta_pc);
    
}



/* COMPROBAR RESULTADOS */

function comprobarResultado(respuesta_usuario, respuesta_pc){

    if(respuesta_pc === respuesta_usuario){

        contador_empate++;
        puntos_empate.textContent = contador_empate;

    }else if(respuesta_usuario === "piedra" && respuesta_pc === "tijera"){

        contador_jugador++;
        puntos_jugador.textContent = contador_jugador;

    }else if(respuesta_usuario === "tijera" && respuesta_pc === "papel"){

        contador_jugador++;
        puntos_jugador.textContent = contador_jugador;
    }else if(respuesta_usuario === "papel" && respuesta_pc === "piedra"){

        contador_jugador++;
        puntos_jugador.textContent = contador_jugador;

    }else{
        
        contador_pc++;
        puntos_pc.textContent = contador_pc;
    }

}