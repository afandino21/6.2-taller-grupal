// Obtén todas las tarjetas con la clase 'image-block'
const imageBlocks = document.querySelectorAll('.image-block');

// Agrega un controlador de eventos de clic a cada tarjeta
imageBlocks.forEach(imageBlock => {
    imageBlock.addEventListener('click', () => {
        const productId = imageBlock.getAttribute('data-id');

        // Realiza un fetch a data.js y muestra la información del producto
        fetch('DATA.js') // Asegúrate de que la URL sea correcta
            .then(response => response.json())
            .then(data => {
                const product = data[productId];
                // Aquí debes mostrar la información del producto, por ejemplo, en un cuadro de diálogo o div en tu página
                // Puedes acceder a las propiedades del producto como product.destination_name, product.country, etc.
                console.log(product);
            })
            .catch(error => {
                console.error('Hubo un error al cargar los datos:', error);
            });
    });
});