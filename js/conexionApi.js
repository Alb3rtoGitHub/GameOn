const proxyURL = 'https://api.allorigins.win/get?url=';
const apiURL = 'https://www.freetogame.com/api/games';

// const proxyURL = 'https://api.allorigins.win/get?url=';
// const apiURL = 'https://www.mmobomb.com/api1/games';

function getGames() {
    const respuesta = fetch(proxyURL + encodeURIComponent(apiURL));
    respuesta
        .then(response => response.json())
        .then(data => {
            const parsedData = JSON.parse(data.contents);
            renderGames(parsedData.slice(0, 30));
        })
        .catch(error => {
            // Captura cualquier error que ocurra durante la solicitud
            console.error('Hubo un problema con la operación fetch:', error);
        })
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