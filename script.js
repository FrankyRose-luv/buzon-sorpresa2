const buzon = document.getElementById("buzon");
const pila = document.getElementById("pila-cartas");
const cartaGrande = document.getElementById("carta-grande");
const cartaImg = document.getElementById("carta-img");
const finishBtn = document.getElementById("finish-btn");

let abierto = false;
let indiceActual = null;

// 💗 Aquí pones las cartas reales
let cartas = [
    "cartas/carta1.png",
    "cartas/carta2.png",
    "cartas/carta3.png"
];

// 🌸 Muestra la pila de cartas mini
function mostrarPila() {
    pila.innerHTML = "";

    cartas.forEach((carta, index) => {
        let img = document.createElement("img");
        img.src = "img/carta-mini.png"; // mini carta
        img.classList.add("carta-mini");

        // efecto de pila
        img.style.left = "50%";
        img.style.transform = "translateX(-50%)";

        img.style.top = `${index * 15}px`;

        img.style.zIndex = 2100;

        // 💗 abrir carta grande
        img.addEventListener("click", () => mostrarCarta(index));

        pila.appendChild(img);
    });
}

// 🌸 Abre la carta grande
function mostrarCarta(index) {
    indiceActual = index;
    cartaImg.src = cartas[index]; // imagen real
    cartaGrande.classList.add("carta-grande-mostrar");
}

// 🌸 Botón Finish — elimina carta y actualiza pila
finishBtn.addEventListener("click", () => {
    cartaGrande.classList.add("carta-salir");

    setTimeout(() => {
        cartaGrande.classList.remove("carta-grande-mostrar");
        cartaGrande.classList.remove("carta-salir");

        if (indiceActual !== null) {
            cartas.splice(indiceActual, 1); // eliminar carta
            indiceActual = null;
        }

        mostrarPila(); // actualizar pila

        // si ya no quedan cartas → cerrar buzón
        if (cartas.length === 0) {
            pila.classList.add("pila-oculta");
            buzon.src = "img/buzon-cerrado.png";
            buzon.classList.remove("abierto");
        }
    }, 700);
});

// 🌸 Abrir/cerrar buzón
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
