function mostrarOcultarRUT() {
    var checkBox = document.getElementById("rutOpcional");
    var inputRUT = document.getElementById("inputRUT");

    if (checkBox.checked) {
        inputRUT.style.display = "block";
        document.getElementById("rut").setAttribute("required", "required");
    } else {
        inputRUT.style.display = "none";
        document.getElementById("rut").removeAttribute("required");
    }
}
// Función para cargar y mostrar los productos desde el archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('./js/productos.json');
        const productos = await response.json();
        const container = document.getElementById('productos-container');

        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.innerHTML = `
                        <input type="checkbox" name="producto" value="${producto.id}">
                        ${producto.producto} - $${producto.precio.toFixed(2)}
                    `;
            container.appendChild(divProducto);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

cargarProductos();






