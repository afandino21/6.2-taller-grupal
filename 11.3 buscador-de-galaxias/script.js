const busquedaInput = document.getElementById('busqueda');
const container = document.getElementById('container');
const busqueda = document.getElementById('buttonBusqueda');
const clear = document.getElementById('clearBusqueda');
const previousButton = document.getElementById('previousPage');
const nextButton = document.getElementById('nextPage');
const buscado = localStorage.setItem('buscado', false)

    
    busqueda.style.display ="block";
    clear.style.display = "none";
    previousButton.style.display = "none";
    nextButton.style.display = "none";

let currentPage = 1;
const resultsPerPage = 20;
let totalResults = 0;
let currentResults = [];

const updateResults = () => {
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const displayedResults = currentResults.slice(startIndex, endIndex);

    displayedResults.forEach(item => {
        const imageUrl = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result', 'card', 'mb-3');

        const image = document.createElement('img');
        image.src = imageUrl;
        image.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('card-title');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('card-text', 'overflow-auto'); // Aquí usamos solo 'overflow-auto'
        descriptionElement.style.maxHeight = '100px'; // Establecemos una altura máxima en píxeles
        descriptionElement.innerHTML = description;

        cardBody.appendChild(titleElement);
        cardBody.appendChild(descriptionElement);

        resultDiv.appendChild(image);
        resultDiv.appendChild(cardBody);

        container.appendChild(resultDiv);
    });

    updateButtons();
};

const updateButtons = () => {
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= Math.ceil(totalResults / resultsPerPage);
};

const fetchResults = () => {
    const searchTerm = busquedaInput.value.trim();
    if (searchTerm === '') {
        return;
    }

    const apiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            currentResults = data.collection.items;
            totalResults = currentResults.length;
            currentPage = 1;
            updateResults();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

busqueda.addEventListener('click', () => {
    fetchResults();
    previousButton.style.display = "inline-block";
      nextButton.style.display = "inline-block"
      clear.style.display = "block";
      busqueda.style.display ="none";
}
);
busquedaInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      fetchResults();
      previousButton.style.display = "inline-block";
      nextButton.style.display = "inline-block";
      clear.style.display = "block";
    }
  });

previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateResults();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
        currentPage++;
        updateResults();
    }
});

function limpiarBusqueda(){
window.location.href = "index.html"
};

// Codigo Inicial (Tambien funciona)

/*

const busquedaInput = document.getElementById('busqueda');
const container = document.getElementById('container');
const busqueda = document.getElementById('buttonBusqueda');

busqueda.addEventListener('click', () => {
    const searchTerm = busquedaInput.value.trim();
    if (searchTerm === '') {
        return;
    }

    const apiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = ''; // Limpiamos el contenedor antes de agregar nuevos resultados

            const items = data.collection.items;
            items.forEach(item => {
                const imageUrl = item.links[0].href;
                const title = item.data[0].title;
                const description = item.data[0].description;

                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result', 'card', 'mb-3'); // Agregamos clases Bootstrap

                const image = document.createElement('img');
                image.src = imageUrl;
                image.classList.add('card-img-top'); // Clase Bootstrap para imagen superior

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body'); // Clase Bootstrap para cuerpo de tarjeta

                const titleElement = document.createElement('h2');
                titleElement.classList.add('card-title'); // Clase Bootstrap para título
                titleElement.textContent = title;

                const descriptionElement = document.createElement('p');
                descriptionElement.classList.add('card-text', 'overflow-auto', 'max-height-100'); // Clases Bootstrap para descripción con scroll
                descriptionElement.innerHTML = description;

                cardBody.appendChild(titleElement);
                cardBody.appendChild(descriptionElement);

                resultDiv.appendChild(image);
                resultDiv.appendChild(cardBody);

                container.appendChild(resultDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

*/