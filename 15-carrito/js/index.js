let stock = [];
let totalPrice = 0;
let cart = [];

document.addEventListener("DOMContentLoaded", function () {
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
                            <p class="card-text">Precio: &#36;${product.precio}  Stock: <span id="stock-${product.id}">${product.cantidad_stock}</span></p>
                            <p class="card-text">${product.descripcion}</p>
                            <a class="btn btn-primary add-to-cart">Añadir al carrito</a>
                        </div>
                    </div>
                `;

                productList.appendChild(divProducto);

                const addToCartButtons = divProducto.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = button.parentNode.querySelector('.card-title').id;
                        addToCart(productId);
                    });
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de productos:", error);
        });
});

function addToCart(productId) {
    // Verifica si hay stock disponible
    const productIndex = parseInt(productId);
    const productActual = stock[productIndex];

    if (productActual.cantidad_stock > 0) {
        // Reduce el stock y agrega el producto al carrito
        productActual.cantidad_stock -= 1;

        // Agrega el producto al carrito
        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({
                productId: productId,
                quantity: 1,
                product: productActual
            });
        }

        // Actualiza el precio total
        totalPrice += productActual.precio;
        let totalCart = document.getElementById("totalCart");
        totalCart.innerText = `$${totalPrice.toFixed(2)}`;

        // Actualiza la visualización del carrito
        updateCartDisplay();

        // Actualiza la cantidad de stock en el divProducto
        const stockElement = document.getElementById(`stock-${productId}`);
        stockElement.textContent = productActual.cantidad_stock;
    } else {
        alert('Producto agotado o no válido.');
    }
}

function removeFromCart(productId) {
    // Busca el producto en el carrito
    const cartItemIndex = cart.findIndex(item => item.productId === productId);

    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];

        // Decrementa la cantidad en el carrito de a uno
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            // Si la cantidad es 1, elimina el producto del carrito
            cart.splice(cartItemIndex, 1);
        }

        // Incrementa el stock de ese producto
        const productIndex = parseInt(productId);
        const productActual = stock[productIndex];
        productActual.cantidad_stock += 1;

        // Actualiza el precio total
        totalPrice -= cartItem.product.precio;
        let totalCart = document.getElementById("totalCart");
        totalCart.innerText = `$${totalPrice.toFixed(2)}`;

        // Actualiza la visualización del carrito
        updateCartDisplay();

        // Actualiza la cantidad de stock en el divProducto
        const stockElement = document.getElementById(`stock-${productId}`);
        stockElement.textContent = productActual.cantidad_stock;
    }
}


function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Limpia el contenido actual del carrito

    cart.forEach(cartItem => {
        const cartItemRow = document.createElement('tr');

        cartItemRow.innerHTML = `
            <th>${cartItem.product.producto}</th>
            <th>$${cartItem.product.precio}</th>
            <th class="quantity">${cartItem.quantity}</th>
            <th><button class="btn btn-primary delete-btn" data-product-id="${cartItem.productId}">X</button></th>
        `;
        cartContainer.appendChild(cartItemRow);

        const deleteButton = cartItemRow.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            const productIdToRemove = this.getAttribute("data-product-id");
            removeFromCart(productIdToRemove);
        });
    });
}

// Agrega un event listener al elemento select
const paymentMethodSelect = document.getElementById('payment-method');
paymentMethodSelect.addEventListener('change', updateTotal);

// Define una función para actualizar el total
function updateTotal() {
    const selectedPaymentMethod = paymentMethodSelect.value;
    let totalWithDiscount = totalPrice;

    // Calcula el total actualizado dependiendo del método de pago
    if (selectedPaymentMethod === 'cash') {
        // Aplica un 10% de descuento si el método de pago es en efectivo
        totalWithDiscount = totalPrice * 0.9;
    } else if (selectedPaymentMethod === 'credit') {
        // Aplica un 7% de aumento si el método de pago es con crédito
        totalWithDiscount = totalPrice * 1.07;
    }

    // Actualiza el contenido del elemento span con el nuevo total
    const totalCart = document.getElementById('totalCart');
    totalCart.innerText = `$${totalWithDiscount.toFixed(2)}`;
}

// Llama a la función para actualizar el total inicialmente
updateTotal();
