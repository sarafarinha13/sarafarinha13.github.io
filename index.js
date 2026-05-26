window.onload = () => {

    /*ELEMENTOS HTML*/

    const slides = document.querySelectorAll(".slide");

    const asterisco = document.querySelector("#asterisco");

    /*  VARIABLES*/

    let currentSlide = 0;

    let scrolling = false;

    /*SLIDE INICIAL*/

    slides[currentSlide].classList.add("active");

    /*EVENTO SCROLL*/

    window.addEventListener("wheel", (e) => {

        /* EVITA SPAM DE SCROLL */

        if(scrolling) return;

        scrolling = true;

        /* QUITA LA SLIDE ACTUAL */

        slides[currentSlide].classList.remove("active");

        /* DETECTA DIRECCIÓN */

        if(e.deltaY > 0){

            currentSlide++;

        }else{

            currentSlide--;

        }

        /* EVITA PASARSE DEL INICIO */

        if(currentSlide < 0){

            currentSlide = 0;

        }

        /* EVITA PASARSE DEL FINAL */

        if(currentSlide >= slides.length){

            currentSlide = slides.length - 1;

        }

        /* MUESTRA NUEVA SLIDE */

        slides[currentSlide].classList.add("active");

        /* GIRA EL ASTERISCO */

        asterisco.style.transform =
        `rotate(${currentSlide * 180}deg)`;

        /* DESBLOQUEA SCROLL */

        setTimeout(() => {

            scrolling = false;

        }, 700);

    });

};