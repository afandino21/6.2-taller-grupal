const url = 'https://japceibal.github.io/japflix_api/movies-data.json';

async function fetchMovies() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

function displayMovies(movies) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    movies.forEach(movie => {

        const genresText = movie.genres.map(genre => genre.name).join(' - ');
        const offcanvasId = `offcanvasTop-${movie.id}`;

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
        <div type="button" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}" aria-controls="${offcanvasId}">
        <h5>${movie.title}</h5> <a>Puntuación: ${'⭐'.repeat(Math.round(movie.vote_average))} (${(movie.vote_average)})</a>
        <p>${movie.tagline}</p></div>


        <div class="offcanvas offcanvas-top text-light" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel">

        <div class="row mt-5 mx-5">
            <div class="col-lg-3">
                <h5>${movie.title}</h5>
            </div>
            <div class="col-lg-3">
                <p>${movie.overview}</p>
                <hr>
                <p id="genres-list">${genresText}</p>
            </div>
            <div class="col-lg-3">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Mas Info.
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item"> Fecha de lanzamiento: ${movie.release_date}</li>
                        <li class="dropdown-item"> Duración: ${movie.runtime} min.</li>
                        <li class="dropdown-item"> Presupuesto: ${movie.budget}</li>
                        <li class="dropdown-item"> Recaudación: ${movie.revenue}</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
        </div>
        </div>
    
        <div class="offcanvas-body">
        </div>
    </div>
    `;


        lista.appendChild(listItem);




    });
}
//BUSCADOR
document.getElementById('btnBuscar').addEventListener('click', async () => {
    const searchTerm = document.getElementById('inputBuscar').value.toLowerCase().trim();
    if (!searchTerm) {
        alert('Ingresa un término de búsqueda.');
        return;
    }

    const movies = await fetchMovies();
    const filteredMovies = movies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(searchTerm);
        const taglineMatch = movie.tagline.toLowerCase().includes(searchTerm);
        const overviewMatch = movie.overview.toLowerCase().includes(searchTerm);
        const genresMatch = movie.genres.some(genre => genre.name.toLowerCase().includes(searchTerm));
        return titleMatch || taglineMatch || overviewMatch || genresMatch;
    });

    displayMovies(filteredMovies);
});