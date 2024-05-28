// const proxyURL = 'https://api.allorigins.win/get?url='; //esta api necesita de un proxy cors
// const apiURL = 'https://www.mmobomb.com/api1/games';
// lo anterior tardaba mucho en cargar por eso me cambie a https://api.rawg.io/api/games
// const itemsPorLote = 10; // Número de juegos a obtener por solicitud
// let puntoInicio = 0;
const apiKey = 'ffb8526984f24963b8644cd46348ffee'; // Reemplaza con tu API Key de RAWG
const apiURL = 'https://api.rawg.io/api/games';
async function getGames() {
    try {
        const response = await fetch(`${apiURL}?key=${apiKey}&page=8&page_size=40`);
        if (response.ok) {
            const data = await response.json();
            console.log(data.results);
            // const parsedData = JSON.parse(data.contents);
            renderGames(data.results); // Renderiza los primeros juegos
        //     puntoInicio += itemsPorLote;
        //     // Carga los juegos restantes en lotes
        //     while (puntoInicio < data.length) {
        //         renderGames(data.slice(puntoInicio, puntoInicio + itemsPorLote));
        //         puntoInicio += itemsPorLote;
        //     }
        // } else {
        //     console.error('Error al obtener los datos:', response.statusText);
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
            <td>${element.name}</td>
            <td>${element.released}</td>
            <td>${element.rating}</td>
            <td>
                <img src="${element.background_image}" alt="" class="img-fluid">
            </td>
        </tr>
        `

    });
    let listaJuegos = `
        <h1 class="text-center p-2 bg-info fs-3 mb-3 bg-dark text-white">Listado Juegos</h1>
    `
    let encabezado = `
        <tr>
            <th scope="col" class="p-2 m-3 w-25">Título</th>
            <th scope="col" class="p-2 m-3 w-25">Año</th>
            <th scope="col" class="p-2 m-3 w-25">Rating</th>
            <th>Imagen</th>
        </tr>
    `
    document.querySelector('#listaJuegos').innerHTML = listaJuegos;
    document.querySelector('#encabezado').innerHTML = encabezado;
    document.querySelector('#juegos').innerHTML = rows;
}