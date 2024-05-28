const proxyURL = 'https://api.allorigins.win/get?url=';//esta api necesita de un proxy cors
const apiURL = 'https://www.mmobomb.com/api1/games';

let paginaActual = 1; // página actual
const itemsPorPagina = 20; // juegos por pagina
let jsonData = []; // para almacenar los datos obtenidos de la API alrededor de 400 para esta API, no vienen por pagina

function llamarAPI() {
    const respuesta = fetch(proxyURL + encodeURIComponent(apiURL));

    respuesta
        .then(response => response.json())
        .then(data => {
            jsonData = JSON.parse(data.contents);
            dibujarDatos();
        })
        .catch(error => console.error('Hubo un problema con la operación fetch:', error));
}

function dibujarDatos() {
    // Calcular indice de los elementos a mostrar en la pagina actual
    const indiceInicial = (paginaActual - 1) * itemsPorPagina;
    const indiceFinal = indiceInicial + itemsPorPagina;
    const itemsAmostrar = jsonData.slice(indiceInicial, indiceFinal);
    
    const filas = itemsAmostrar.map(obj => Juego(obj));
    document.querySelector('.juegosTendencia .juegos').innerHTML = filas.join('');

    // Actualizar el estado de los botones
    // document.querySelector('.anterior').disabled = currentPage === 1;
    // document.querySelector('.siguiente').disabled = endIndex >= jsonData.length;
}


function Juego(obj) {
    return `
        <a href="./pages/detalle.html">
            <div class="juego">
                <img class="imgTendencia" src="${obj.thumbnail}" alt="${obj.title}" loading="lazy">
                <div class="tituloJuego">
                    <h4>${obj.title}</h4>
                </div>
            </div>
        </a>
    `;
}

// Función para cargar la pagina siguiente
function cargarPaginaSiguiente() {
    const paginasTotales = Math.ceil(jsonData.length / itemsPorPagina);
    if (paginaActual < paginasTotales)
    paginaActual++;
    dibujarDatos();
}

// Función para cargar la pagina anterior
function cargarPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        dibujarDatos();
    }
}

// Agregar los event listeners a los botones
document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

// Llamar a la función para obtener y dibujar los datos iniciales
llamarAPI(paginaActual);

