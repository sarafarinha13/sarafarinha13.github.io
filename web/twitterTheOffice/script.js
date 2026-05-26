// Guardamos en una variable el elemento del HTML con id "contenedor"
let contenedor = document.getElementById("contenedor");

let inputTuit = document.getElementById("tuit");
let publicarTuit = document.getElementById("buttonTuit");

/* Una vez llamados el boton y el tuit hacemos que cada vez que le demos a publicar se cree un post */
publicarTuit.addEventListener("click", function(){
    let textoUsuario = inputTuit.value; /* value permite obtener o cambiar el texto que ha escrito el usuario dentro de un input o textarea */
    if(textoUsuario.trim() === ""){
    alert("Escribe algo antes de publicar");
    return;
}
    createPost(textoUsuario, "@prisionMike", "img/1 (7).jpg");
    inputTuit.value = ""; /* se resetea y vuelve a visualizarse lo que pusimos en el placeholder */
});    



/* creamos usuarios y mensajes predeterminados */
let usuarios = [
    {nombre: "@prankOfficeCeo", foto: "img/jim.jpg"},
    {nombre: "@receptionQueen", foto:"img/pam.jpg"},
    {nombre: "@farmerDwight", foto:"img/dwight.jpg"},
    {nombre: "@rylly", foto: "img/ryankelly.png"},
    {nombre: "@idontcareStanley", foto: "img/stanley.jpg"},
    {nombre: "theBESTboss", foto: "img/michael.jpg"}
];

let mensajes = [
    "Bears. Beets. Battlestar Galactica.",
    "That's what she said.",
    "Identity theft is not a joke!",
    "I declare bankruptcy!",
    "Jim stop it..."
];

/* CREAMOS FUNCION RANDOM  */

function getRandom(lista){
    return lista[Math.floor(Math.random() * lista.length)];
}

/*Creamos una función llamada createPost Esta función servirá para generar un nuevo post en la página */
function createPost(textoUsuario, nombre, foto){

    /* POST */
    // Creamos un nuevo <div> en JavaScript (aún no está en el HTML)
    let post = document.createElement("div");

    // Le añadimos la clase "post" para poder darle estilos con CSS
    post.classList.add("post");

    /* si es nuestro el post le añadimos una clase para personalizarlo */
    if(nombre === "@prisionMike"){
        post.classList.add("post_propio");
    }

    // Añadimos ese div dentro del contenedor (ahora sí aparece en pantalla)
    contenedor.prepend(post); /* asi lo pone arriba de todo con el appendChild va debajo */


    /* CONTENIDO DEL POST */
    let post_user = document.createElement("div");
        post_user.classList.add("post_user");

    let post_tuit = document.createElement("div");
        post_tuit.classList.add("post_tuit");

    let post_likes = document.createElement("div");
        post_likes.classList.add("post_likes");

      
    post.appendChild(post_user);
    post.appendChild(post_tuit);
    post.appendChild(post_likes);


    /* CONTENIDO POST_USER */
    let avatar = document.createElement("img");
        avatar.classList.add("post_avatar");
        avatar.src= foto; /* aqui lo igualamos a las fotos del ARRAY de USUARIOS */

    let username = document.createElement("p");
        username.classList.add("post_username");
        username.innerText = nombre;  /* aqui lo igualamos a los nombres del ARRAY de USUARIOS */

    post_user.appendChild(avatar);
    post_user.appendChild(username);

    /* CONTENIDO POST_TUIT */
    let texto = document.createElement("p");
        texto.classList.add("post_texto");
        texto.innerText = textoUsuario; /* aqui lo igualamos al texto que entra por teclado en el buttonTuit publicar del HTML */

    post_tuit.appendChild(texto);

    /* CONTENIDO POST_LIKES */
    let likes_corazon = document.createElement("button");
        likes_corazon.classList.add("likes_corazon");
        likes_corazon.innerHTML = '<i class="fa-solid fa-mug-hot"></i>'; /* conectado por el link del head al  font Awesome */
      
    let likes_contador = document.createElement("span");
        likes_contador.classList.add("likes_contador");
        likes_contador.innerText = "0";

    post_likes.appendChild(likes_corazon);
    post_likes.appendChild(likes_contador);

    /* CREAR FUNCIONAMIENTO BOTÓN DE LIKE (likes_corazon) */

    likes_corazon.addEventListener("click", function(){
        
        let numeroLikes = parseInt(likes_contador.innerText); /* #1 cogemos el número actual  */

        if(likes_corazon.classList.contains("liked")){
            numeroLikes--;
            likes_contador.innerText = numeroLikes;

            likes_corazon.classList.remove("liked");
            likes_corazon.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';

        }else{
            numeroLikes++;
            likes_contador.innerText = numeroLikes;
            likes_corazon.classList.add("liked");
            likes_corazon.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';

            likes_corazon.classList.add("animar"); /* Añadimos una clase nueva "animar" */

            setTimeout(function() {
                likes_corazon.classList.remove("animar");
            }, 50);
        }
    });

    /* CREAR GENERADOR DE LIKES AUTOMÁTICOS */
    function generarLikesAutomaticos(){

        let numero = parseInt(likes_contador.innerText);

        // 50% de probabilidad de sumar like
        if(Math.random() > 0.5){
            numero++;
            likes_contador.innerText = numero;
        }

        // tiempo random entre 2 y 5 segundos
        let tiempo = Math.floor(Math.random() * 3000) + 2000;

        setTimeout(generarLikesAutomaticos, tiempo);
    }
    generarLikesAutomaticos();
}
    /* CREAMOS UNA FUNCION QUE GENERE POST CON NOMBRES/ FOTOS Y MENSAJES ALEATORIOS */

    function postRandom(){

        let mensajesRandom = getRandom(mensajes);
        let usuariosRandom = getRandom(usuarios);

        createPost(
            mensajesRandom, 
            usuariosRandom.nombre, 
            usuariosRandom.foto
        );

        let tiempo = Math.floor(Math.random()*4000)+2000;

        setTimeout(postRandom, tiempo);
    }


    postRandom();
  