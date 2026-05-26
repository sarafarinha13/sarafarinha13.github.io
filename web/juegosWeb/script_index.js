let enlaces_juegos = document.querySelectorAll("#menu_juegos a");

enlaces_juegos.forEach(function(enlace) {
    enlace.addEventListener("click", function(event) {
        let nombre_guardado = localStorage.getItem("nombre_usuario");

        if (nombre_guardado === null || nombre_guardado === "") {
            event.preventDefault();
            alert("Primero debes escribir tu nombre");
        }
    });
});



let nombre_usuario = document.querySelector("#nombre_usuario");
let caja_nombre = document.createElement("input");
    caja_nombre.type = "text";
    caja_nombre.maxLength = 10;
    caja_nombre.placeholder = "Escribe tu nombre";
    
let asignar_nombre = document.createElement("button");
    asignar_nombre.classList.add("botones_juego");

let nombre = "";

nombre_usuario.appendChild(caja_nombre);
nombre_usuario.appendChild(asignar_nombre);

asignar_nombre.textContent = "Guardar Nombre"

asignar_nombre.addEventListener("click", function(){
    nombre = caja_nombre.value.trim();

    if (caja_nombre.value === "") {

    alert("Escribe tu nombre");

    } else {
   
        localStorage.setItem("nombre_usuario", nombre);
        caja_nombre.value = "";
    }
});




