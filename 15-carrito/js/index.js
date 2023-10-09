let stock = [];
let totalPrice = 0;

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        stock = data;
        const productList = document.getElementById("item-list");

        data.forEach(product => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("div-producto");
            divProducto.classList.add("col-12");
            divProducto.classList.add("col-lg-4");
            divProducto.classList.add("col-md-6");
            divProducto.classList.add("col-sm-12");

            divProducto.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body text-center">
                        <h5 class="card-title" id="${product.id}">${product.producto}</h5>
                        <img src="${product.img}" class="card-img-top" alt="Imagen del Producto">              
                        <p class="card-text">Precio: &#36;${product.precio}  Stock: ${product.cantidad_stock}  </p>
                        <p class="card-text">${product.descripcion}</p>
                        <a class="btn btn-primary add-to-cart">Añadir al carrito</a>
                    </div>
                </div>
            `;

            productList.appendChild(divProducto);
        });

        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.parentNode.querySelector('.card-title').id;
                addToCart(productId);
            });
        });
    })
    .catch(error => {
        console.error("Error al cargar los datos de productos:", error);
    });

function addToCart(productId) {
    const productActual = stock[productId];
    const cart = document.getElementById('cart-items');
    const existingCartItem = cart.querySelector(`[data-product-id="${productId}"]`);

    if (existingCartItem) {
        // El producto ya está en el carrito, aumenta la cantidad
        const quantityElement = existingCartItem.querySelector('.quantity');
        const currentQuantity = parseInt(quantityElement.textContent, 10);
        const newQuantity = currentQuantity + 1;
        quantityElement.textContent = newQuantity;

        // Actualiza el precio total
        totalPrice += productActual.precio;
        let totalCart = document.getElementById("totalCart");
        totalCart.innerText = `$${totalPrice.toFixed(2)}`;
    } else {
        // El producto no está en el carrito, crea un nuevo elemento
        const cartItem = document.createElement('tr');
        cartItem.dataset.productId = productId;

        cartItem.innerHTML = `
                <th>${productActual.producto}</th>
                <th>${productActual.precio}</th>
                <th class="quantity">1</th>
                <th><button class="btn btn-primary delete-btn" data-product-id="${productId}">X</button></th>
            `;

        cart.appendChild(cartItem);

        // Actualiza el precio total
        totalPrice += productActual.precio;
        let totalCart = document.getElementById("totalCart");
        totalCart.innerText = `$${totalPrice.toFixed(2)}`;

        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productIdToRemove = this.getAttribute("data-product-id");
                removeFromCart(productIdToRemove);
            });
        });
    }
}


function removeFromCart(productId) {
    // Obtén el elemento de la fila que deseas eliminar
    const cartItem = document.querySelector(`[data-product-id="${productId}"]`);

    if (cartItem) {
        // Obtén el precio del producto que se va a eliminar
        const productActual = stock[productId];
        const productPrice = productActual.precio;

        // Resta el precio del producto eliminado del precio total
        totalPrice -= productPrice;

        // Actualiza el precio total en el elemento HTML correspondiente
        let totalCart = document.getElementById("totalCart");
        totalCart.innerText = `$${totalPrice.toFixed(2)}`;

        // Elimina el elemento de la fila del carrito
        cartItem.remove();
    }
}