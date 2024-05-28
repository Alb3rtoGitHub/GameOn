// const proxyURL = 'https://api.allorigins.win/get?url=';//esta api necesita de un proxy cors
// const apiURL = 'https://www.mmobomb.com/api1/games';
// lo anterior tardaba mucho en cargar por eso me cambie a https://api.rawg.io/api/games

const apiKey = 'ffb8526984f24963b8644cd46348ffee'; // Reemplaza con tu API Key de RAWG
const apiURL = 'https://api.rawg.io/api/games';
let paginaActual = 1;
const pageSize = 20;


async function llamarAPI(page) {
    try {
        const response = await fetch(`${apiURL}?key=${apiKey}&page=${page}&page_size=${pageSize}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data.results);
        dibujarDatos(data.results);
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
    }
}

function dibujarDatos(json) {
    const filas = json.map(obj => Juego(obj));
    document.querySelector('.juegosTendencia .juegos').innerHTML = filas.join('');
}


function Juego(obj) {
    return `
        <a href="./pages/detalle.html">
            <div class="juego">
                <img class="imgTendencia" src="${obj.background_image}" alt="${obj.name}" loading="lazy">
                <div class="tituloJuego">
                    <h4>${obj.name}</h4>
                </div>
            </div>
        </a>
    `;
}

// Función para cargar la pagina siguiente
function cargarPaginaSiguiente() {
    paginaActual++;
    llamarAPI(paginaActual);
}

// Función para cargar la pagina anterior
function cargarPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        llamarAPI(paginaActual);
    }
}

// Agregar los event listeners a los botones
document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

// Llamar a la función para obtener y dibujar los datos iniciales
llamarAPI(paginaActual);

