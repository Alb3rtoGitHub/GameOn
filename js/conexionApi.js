const proxyURL = 'https://api.allorigins.win/get?url='; //esta api necesita de un proxy cors
const apiURL = 'https://www.mmobomb.com/api1/games';
const itemsPorLote = 10; // Número de juegos a obtener por solicitud
let puntoInicio = 0;

async function getGames() {
    try {
        const response = await fetch(proxyURL + encodeURIComponent(apiURL));
        if (response.ok) {
            const data = await response.json();
            const parsedData = JSON.parse(data.contents);
            renderGames(parsedData); // Renderiza los primeros juegos
            puntoInicio += itemsPorLote;
            // Carga los juegos restantes en lotes
            while (puntoInicio < data.length) {
                renderGames(data.slice(puntoInicio, puntoInicio + itemsPorLote));
                puntoInicio += itemsPorLote;
            }
        } else {
            console.error('Error al obtener los datos:', response.statusText);
        }
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
    }
}

function renderGames(data) {
    let rows = '';
    data.forEach(element => {
        rows += `
        <tr>
            <td>${element.title}</td>
            <td>${element.release_date}</td>
            <td>${element.genre}</td>
            <td>
                <img src="${element.thumbnail}" alt="" class="img-fluid">
            </td>
        </tr>
        `

    });
    let listaJuegos = `
        <h1 class="text-center p-2 bg-info fs-3 mb-3 bg-dark text-white">Listado Juegos</h1>
    `
    let encabezado = `
        <tr>
            <th scope="col">Título</th>
            <th scope="col">Año</th>
            <th scope="col">Género</th>
            <th>Imagen</th>
        </tr>
    `
    document.querySelector('#listaJuegos').innerHTML = listaJuegos;
    document.querySelector('#encabezado').innerHTML = encabezado;
    document.querySelector('#juegos').innerHTML = rows;
}