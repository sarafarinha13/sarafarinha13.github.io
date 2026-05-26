/* 
    document = toda la página web
    querySelector() = búscame algo 
    ('.slider') = busca un elemento con esta clase, coge TODO el bloque (todas las imagenes)

    Resultado --> guardas ese elemetno en un variable slider

    querySelectorAll() = devuelve varios (lista de slides (como un Array))

    let currentIndex = 0  = cajita donde guardas un valor (en qué imagen estás)
       
        currentIndex = 0 → imagen 1
        currentIndex = 1 → imagen 2
        currentIndex = 2 → imagen 3
 */

const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide'); /* querySelector devuelve un elemento, hay que poner ALL ARRAY(nodelist) */
const dotsContainer = document.querySelector('.dots-container');

let indiceActual = 0;
let interval;


/* 
    slide.forEach((elemento, index)) -> significa: recorre las imágenes una a una
    En este caso elemento es (img1, imag2...) pero ponemos "_" porque no interesa la imagen.
    Solo nos interesa el número porque vamos a crear un punto por cada imagen. Es decir, no necesitamos acceder al elemento

    ---
    => se llama Arrow Function (forma corta de escribir funciones) hace lo mismo que esto: 

        slide.forEach(function(elemento, index) {
        // código
        });

    Significa: por cada elemento, ejecuta este código
    ---
    const dot = document.createElement('div'); 
    creo un nuevo <div> en javaScript, el cual no exite en HTML. Crea un div por cada imagen crea un div(un punto)

    dot.classList.add('dot');
    Le añade una clase "dot" a cada div que crea

    dotsContainer.appendChild(dot);
    Lo mete en el HTML

    Con estas líneas nos estamos ahorrando crear esto:
    <div class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        ...
    </div>

*/

slide.forEach((_, index) => {
    const dot = document.createElement('div'); /* creamos un <div> en memoria por cada imagen y la guardo en la variable dot*/
    dot.classList.add('dot'); /* Le añado la clase dot a esos div*/
    dotsContainer.appendChild(dot); /* añado ese div dentro del contenedor .dots-container para que aparezca en la página */

    if(index === 0){ /* indico que empiece por el primero */
        dot.classList.add('active') /* añadimos la clase active, en este caso al primer dot */
    }

    dot.setAttribute('data-index', index);
    dot.addEventListener('click', () => {
        goToSlide(index);
    })
})


/* Esta función mueve el slider hacia la izquierda según el índice actual.

Coge el índice y lo multiplica por 100 en negativo:

indice 0 → -0 * 100 = 0% (no se mueve)
indice 1 → -1 * 100 = -100% (se mueve una imagen a la izquierda y se muestra la siguiente)
indice 2 → -2 * 100 = -200% (se mueve dos imágenes)

Esto funciona porque cada slide ocupa el 100% del ancho del contenedor.

$ = (dentro de ${} = “ejecuta este código y pon el resultado aquí”
*/

function updateSlider(){
    slider.style.transform = `translateX(${-indiceActual * 100}%)`; 
    updateDots();
}

function nextSlide() {
    indiceActual = (indiceActual + 1) % slide.length;  /* si llego al final me vuelve al principio / indiceActual = 4 → (4 + 1) % 5 = 0 💥*/
    updateSlider();
}

function prevSlide() {
    indiceActual = (indiceActual - 1 + slide.length) % slide.length;  
    updateSlider();
}

function goToSlide(index){
    indiceActual = index; 
    updateSlider();
}

function updateDots(){
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === indiceActual);
    })
}