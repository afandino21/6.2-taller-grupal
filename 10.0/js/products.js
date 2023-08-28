document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const filterButton = document.getElementById("filterButton");

    filterButton.addEventListener("click", filterProducts);

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <h5>${product.title}</h5>
                <p><strong>Price:</strong> $${product.price}</p>
                <p>${product.description}</p>
            `;
            productList.appendChild(listItem);
        });
        if (productList.innerHTML === '') {
            const itemsVacio = document.createElement("li");
            itemsVacio.className = "list-group-item";
            itemsVacio.innerHTML = `
                <h5>No hay productos para mostrar</h5>
                <p>Elegir otro rango</p>
            `;
            productList.appendChild(itemsVacio);
        }
    }

    function filterProducts() {
        const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
        const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.filter(product => product.price >= minPrice && product.price <= maxPrice);
                displayProducts(filteredProducts);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

    }
});
