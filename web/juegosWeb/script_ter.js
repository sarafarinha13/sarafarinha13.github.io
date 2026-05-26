console.log("TER CONECTADO");

/* TRAEMOS NOMBRE GUARDADO DESDE LA PÁGINA INICIAL */
let nombre_usuario = localStorage.getItem("nombre_usuario");

/* TRAEMOS VARIABLES DEL HTML */
const nombre_jugador = document.querySelector("#nombre_jugador");
const puntos_jugador = document.querySelector("#puntos_jugador");
const puntos_empate = document.querySelector("#puntos_empate");
const puntos_pc = document.querySelector("#puntos_pc");
const salir_juego = document.querySelector("#salir_juego");
const casillas = document.querySelectorAll(".casilla");

/* MOSTRAMOS EL NOMBRE DEL USUARIO EN EL MARCADOR */
nombre_jugador.textContent = nombre_usuario;

/* CONTADORES DEL MARCADOR */
let contador_jugador = 0;
let contador_empate = 0;
let contador_pc = 0;

/* ARRAY QUE GUARDA EL ESTADO REAL DEL TABLERO
Cada posición representa una casilla:
0 | 1 | 2
3 | 4 | 5
6 | 7 | 8
*/
let tablero = ["", "", "", "", "", "", "", "", ""];

/* COMBINACIONES QUE DAN VICTORIA */
let combinaciones_ganadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* AL SALIR DEL JUEGO, BORRAMOS EL NOMBRE GUARDADO */
salir_juego.addEventListener("click", function(){
    localStorage.removeItem("nombre_usuario");
});

/* Recorremos todas las casillas, siendo "casilla" la casilla actual
e "indice" la posición que ocupa dentro del tablero */
casillas.forEach(function(casilla, indice) {
    casilla.addEventListener("click", function() {

        /* Si la casilla ya tiene algo, no hacemos nada.
        Hasta que no pulsemos una vacía, no se ejecutará jugarPc().
        children es una propiedad que representa los hijos del elemento. */
        if (casilla.children.length > 0) {
            return; /* Sale de la función del click y no continúa con la jugada */
        }

        /* TURNO DEL USUARIO: poner X */
        const img_x = document.createElement("img");
        img_x.src = "img/x.png";
        casilla.appendChild(img_x);

        /* Guardamos la X en el array tablero */
        tablero[indice] = "x";

        /* Comprobamos si el usuario ha ganado o si hay empate */
        let resultado = comprobarResultado();

        if (resultado !== null) {
            finalizarRonda(resultado);
            return;
        }

        /* Después juega el PC */
        jugarPc();
    });
});

/* FUNCIÓN PARA QUE JUEGUE EL PC */
function jugarPc() {
    let casillas_libres = [];

    /* Guardamos solo las casillas que siguen vacías */
    casillas.forEach(function(casilla, indice) {
        if (casilla.children.length === 0) {
            casillas_libres.push(indice);
        }
    });

    /* Si no quedan casillas libres, termina la función */
    if (casillas_libres.length === 0) {
        return;
    }

    /* Elegimos una casilla libre al azar */
    let numero_random = Math.floor(Math.random() * casillas_libres.length);
    let indice_pc = casillas_libres[numero_random];
    let casilla_pc = casillas[indice_pc];

    /* Ponemos la O del PC */
    const img_o = document.createElement("img");
    img_o.src = "img/o.png";
    casilla_pc.appendChild(img_o);

    /* Guardamos la O en el array tablero */
    tablero[indice_pc] = "o";

    /* Comprobamos si el PC ha ganado o si hay empate */
    let resultado = comprobarResultado();

    if (resultado !== null) {
        finalizarRonda(resultado);
    }
}

/* FUNCIÓN QUE COMPRUEBA SI HAY GANADOR O EMPATE */
function comprobarResultado() {

    /* Recorremos todas las combinaciones ganadoras */
    for (let i = 0; i < combinaciones_ganadoras.length; i++) {

        let posicion1 = combinaciones_ganadoras[i][0];
        let posicion2 = combinaciones_ganadoras[i][1];
        let posicion3 = combinaciones_ganadoras[i][2];

        /* Si las tres posiciones tienen X, gana el jugador */
        if (
            tablero[posicion1] === "x" &&
            tablero[posicion2] === "x" &&
            tablero[posicion3] === "x"
        ) {
            return "x";
        }

        /* Si las tres posiciones tienen O, gana el PC */
        if (
            tablero[posicion1] === "o" &&
            tablero[posicion2] === "o" &&
            tablero[posicion3] === "o"
        ) {
            return "o";
        }
    }

    /* Si no queda ninguna casilla vacía y nadie ha ganado, hay empate */
    if (!tablero.includes("")) {
        return "empate";
    }

    /* Si no hay victoria ni empate, la partida continúa */
    return null;
}

/* FUNCIÓN QUE ACTUALIZA EL MARCADOR Y REINICIA LA RONDA */
function finalizarRonda(resultado) {

    if (resultado === "x") {
        contador_jugador++;
        puntos_jugador.textContent = contador_jugador;

        setTimeout(function() {
            alert("Has ganado");
            reiniciarRonda();
        }, 400);

    } else if (resultado === "o") {
        contador_pc++;
        puntos_pc.textContent = contador_pc;

        setTimeout(function() {
            alert("Ha ganado el PC");
            reiniciarRonda();
        }, 400);

    } else if (resultado === "empate") {
        contador_empate++;
        puntos_empate.textContent = contador_empate;

        setTimeout(function() {
            alert("Empate");
            reiniciarRonda();
        }, 400);
    }
}

/* FUNCIÓN QUE VACÍA EL TABLERO PARA EMPEZAR OTRA RONDA */
function reiniciarRonda() {

    /* Vaciamos la parte visual */
    casillas.forEach(function(casilla) {
        casilla.innerHTML = "";
    });

    /* Vaciamos la memoria real del tablero */
    tablero = ["", "", "", "", "", "", "", "", ""];
}