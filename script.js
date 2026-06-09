const buzon = document.getElementById("buzon");
const pila = document.getElementById("pila-cartas");
const cartaGrande = document.getElementById("carta-grande");
const cartaImg = document.getElementById("carta-img");
const finishBtn = document.getElementById("finish-btn");

function obtenerAudio(id, src) {
    let audio = document.getElementById(id);

    if (!audio) {
        audio = document.createElement("audio");
        audio.id = id;
        audio.src = src;
        audio.preload = "auto";
        audio.style.display = "none";
        document.body.appendChild(audio);
    }

    if (!audio.src || !audio.src.includes(src)) {
        audio.src = src;
    }

    return audio;
}

const hoverSound = obtenerAudio("hover-sound", "sounds/hover.mp3");
const openSound = obtenerAudio("open-sound", "sounds/open.mp3");
const finishSound = obtenerAudio("finish-sound", "sounds/finish.mp3");

let abierto = false;
let indiceActual = null;

function reproducirSonido(audio) {
    if (!audio) return;

    try {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
        const playPromise = audio.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
        }
    } catch (error) {
        console.warn("No se pudo reproducir el sonido", error);
    }
}

let cartas = [
    "cartas/carta1.png",
    "cartas/carta2.png",
    "cartas/carta3.png",
    "cartas/carta4.png",
    "cartas/carta5.png",
    "cartas/carta6.png",
    "cartas/carta7.png",
    "cartas/carta8.png"
];

function activarHoverMiniCartas() {
    document.querySelectorAll(".carta-mini").forEach((carta) => {
        carta.addEventListener("mouseenter", () => reproducirSonido(hoverSound));
    });
}

function mostrarPila() {
    pila.innerHTML = "";

    let visibles = cartas.slice(-6); 

    let esHorizontal = window.innerWidth > window.innerHeight;
    let esCelular = window.innerWidth < 900;

    let separacion = esCelular
        ? (esHorizontal ? 6 : 7)   
        : 15;                      

    visibles.forEach((carta, index) => {
        let img = document.createElement("img");
        img.src = "img/carta-mini.png";
        img.classList.add("carta-mini");

        img.style.top = `${(visibles.length - 1 - index) * separacion}px`;
        img.style.left = "50%";
        img.style.transform = "translateX(-50%)";
        img.style.zIndex = 2100;

        let indiceReal = cartas.length - visibles.length + index;
        img.addEventListener("click", () => mostrarCarta(indiceReal));

        if (index === visibles.length - 1) {
            img.classList.add("shake-next");
        }

        pila.appendChild(img);
    });

    activarHoverMiniCartas();
}

function mostrarCarta(index) {
    reproducirSonido(openSound);

    indiceActual = index;
    cartaImg.src = cartas[index];

    cartaGrande.classList.remove("carta-grande-oculta");
    cartaGrande.classList.remove("carta-grande-salir");
    cartaGrande.classList.remove("carta-salir");
    cartaGrande.classList.add("carta-grande-mostrar");
}

if (finishBtn) {
    finishBtn.addEventListener("click", () => {
        reproducirSonido(finishSound);

        cartaGrande.classList.add("carta-grande-salir");

        setTimeout(() => {
            cartaGrande.classList.remove("carta-grande-mostrar");
            cartaGrande.classList.remove("carta-grande-salir");
            cartaGrande.classList.add("carta-grande-oculta");

            if (cartas.length > 0) {
                cartas.pop();
            }
            indiceActual = null;

            mostrarPila();

            if (cartas.length === 0) {
                pila.classList.add("pila-oculta");
                buzon.src = "img/buzon-cerrado.png";
                buzon.classList.remove("abierto");
            }
        }, 400);
    });

    function activarHoverMiniCartas() {
    document.querySelectorAll(".carta-mini").forEach(carta => {
        carta.addEventListener("mouseenter", () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
}

}

buzon.addEventListener("click", () => {
    abierto = !abierto;

    if (abierto) {
        buzon.src = "img/buzon-abierto.png";
        buzon.classList.add("abierto");
        pila.classList.remove("pila-oculta");
        mostrarPila();
    } else {
        buzon.src = "img/buzon-cerrado.png";
        buzon.classList.remove("abierto");
        pila.classList.add("pila-oculta");
    }
});
