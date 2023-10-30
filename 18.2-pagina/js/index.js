const imageContainer = document.getElementById("image-container");


const json = "/DATA.json"

fetch(json)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item, index) => {
            // Crear un div para la imagen
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("image-block", "col-sm-4");
            imageDiv.style.background = `url(${item.imageURL}) no-repeat center top`;
            imageDiv.style.backgroundSize = "cover";

            // Crear un párrafo con la descripción
            const description = document.createElement("p");
            description.textContent = item.description;

            // Agregar el párrafo al div de la imagen
            imageDiv.appendChild(description);

            // Agregar el div de la imagen al contenedor
            imageContainer.appendChild(imageDiv);
        });
    });