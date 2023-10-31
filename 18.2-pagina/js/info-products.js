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
    <div class="container mt-4">
        <div class="text-center m-4">
        <img src="${productSelected.imageURL}" class="img-fluid" alt="Imagen del destino">
    </div>
        <div class="card">
            <div class="card-body">
            <p><strong>Destination:</strong> ${productSelected.destination_name}</p>
            <p><strong>Country:</strong> ${productSelected.country}</p>
            <p><strong>Region:</strong> ${productSelected.region}</p>
            <p><strong>Climate:</strong> ${productSelected.climate}</p>
            <p><strong>Attractions:</strong> ${productSelected.attractions}</p>
            <p><strong>Hotel:</strong> ${productSelected.hotel_name}</p>
            <p><strong>Hotel Rating:</strong> ${productSelected.hotel_rating}</p>
            <p><strong>Hotel Price:</strong> $${productSelected.hotel_price}</p>
            <p><strong>Travel Duration:</strong> ${productSelected.travel_duration} days</p>
            <p><strong>Activities:</strong> ${productSelected.activities}</p>            
            </div>
        </div>
    </div>

    `;

    })
    .catch((error) => {
    console.error("Error al cargar los datos del producto: " + error);
    });
} else {
console.log("No hay ID de producto seleccionado en el localStorage.");
}