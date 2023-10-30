const imageContainer = document.getElementById("image-container");

const json = "./js/DATA.json"

fetch(json)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item, index) => {
            // Crear un div para la imagen
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-block", "col-sm-4");
            imageDiv.style.background = `url(${item.imageURL}) no-repeat center top`;
            imageDiv.style.backgroundSize = "cover";
            imageDiv.addEventListener("click", () => {
                // Aquí guardarás el ID del producto en el localStorage
                localStorage.setItem("selectedProductID", item.id);
                console.log(localStorage.getItem("selectedProductID", item.id));
                window.location.href = "info-products.html";
            });
            // Crear un párrafo con la descripción
            const description = document.createElement("p");
            description.textContent = item.country;

            // Agregar el párrafo al div de la imagen
            imageDiv.appendChild(description);

            // Agregar el div de la imagen al contenedor
            imageContainer.appendChild(imageDiv);
        });
    });