let votosGatos = 0;
let votosPerros = 0;

const botonGato = document.querySelector('.animal-gato .boton');
const botonPerro = document.querySelector('.animal-perro .boton');
const votosGatosElem = document.querySelector('.animal-gato .votos');
const votosPerrosElem = document.querySelector('.animal-perro .votos');

function actualizaVotos() {
    votosGatosElem.textContent = votosGatos;
    votosPerrosElem.textContent = votosPerros;
    botonGato.classList.remove('ganador');
    botonPerro.classList.remove('ganador');
    if (votosPerros > votosGatos) {
        botonPerro.classList.add('ganador');
    } else if (votosGatos > votosPerros) {
        botonGato.classList.add('ganador');
    }
}

botonGato.addEventListener('click', () => {
    votosGatos++;
    actualizaVotos();
});
botonPerro.addEventListener('click', () => {
    votosPerros++;
    actualizaVotos();
});
actualizaVotos();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    })
}