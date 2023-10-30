// Obtén la ID del producto guardada en el localStorage
const selectedProductID = localStorage.getItem("selectedProductID");
console.log(selectedProductID);

if (selectedProductID) {
  // Construye la URL con la ID del producto
const productURL = `./js/DATA.json`;

  // Realiza el fetch a la URL del producto específico
fetch(productURL)
    .then((response) => response.json())
    .then((productData) => {
      // Haz algo con los datos del producto, por ejemplo, mostrarlos en la consola
    console.log("Datos del producto seleccionado:", productData[selectedProductID]);
    var productSelected = productData[selectedProductID];
    const containerInfoProducts = document.getElementById("infoProducts");
    containerInfoProducts.innerHTML = `

        <h1 class="text-center">¡Tu Próximo Viaje!</h1>
        <p><strong>Destino:</strong>${productSelected.destination_name}</p>
        <p><strong>País:</strong>${productSelected.country}</p>
        <p><strong>Región:</strong> ${productSelected.region}</p>
        <p><strong>Clima:</strong>${productSelected.climate}</p>
        <p><strong>Atracciones:</strong>${productSelected.attractions}</p>
        <p><strong>Hotel:</strong>${productSelected.hotel_name}</p>
        <p><strong>Rating del Hotel:</strong>${productSelected.hotel_rating}</p>
        <p><strong>Precio del Hotel:</strong>${productSelected.price}</p>
        <p><strong>Duración del Viaje:</strong>${productSelected.travel_duration}</p>
        <p><strong>Actividades:</strong> ${productSelected.activities}</p>
        <center><img class="w-75" src="${productSelected.imageURL}"></center>

    `;

    })
    .catch((error) => {
    console.error("Error al cargar los datos del producto: " + error);
    });
} else {
console.log("No hay ID de producto seleccionado en el localStorage.");
}