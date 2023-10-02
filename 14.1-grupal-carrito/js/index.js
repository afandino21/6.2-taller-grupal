function mostrarOcultarRUT() {
    const inputRUT = document.getElementById('inputRUT');
    const rutOpcional = document.getElementById('rutOpcional');

    inputRUT.style.display = rutOpcional.checked ? 'block' : 'none';
}

const nombreClienteInput = document.getElementById('nombreCliente');
const rutInput = document.getElementById('rut');
const facturaNombre = document.querySelector('#factura p:nth-child(1)');
const facturaRUT = document.querySelector('#factura p:nth-child(2)');
const facturaProductos = document.querySelector('#factura p:nth-child(3)');


nombreClienteInput.addEventListener('input', () => {
    if (nombreClienteInput.value !== '') {
        facturaNombre.textContent = `Nombre del cliente: ${nombreClienteInput.value}`;
    } else {
        facturaNombre.textContent = `Nombre del cliente:`;
    }
});

rutInput.addEventListener('input', () => {
    // Reemplaza cualquier carácter que no sea un número con una cadena vacía
    const numericValue = rutInput.value.replace(/\D/g, '');

    if (numericValue !== '') {
        facturaRUT.textContent = `RUT: ${numericValue}`;
    } else {
        facturaRUT.textContent = `RUT:`;
    }

    // Actualiza el valor del campo de RUT con solo números
    rutInput.value = numericValue;
});



    async function cargarProductos() {
        try {
            const response = await fetch('./js/productos.json');
            const productos = await response.json();
            const container = document.getElementById('productos-container');
            const factura = document.getElementById('factura');
            let total = 0; // Variable para llevar el total de precios seleccionados
    
            productos.forEach(producto => {
                const divProducto = document.createElement('div');
                divProducto.innerHTML = `
                    <input type="checkbox" name="producto" value="${producto.id}">
                    ${producto.producto} - $${producto.precio.toFixed(2)}
                `;
    
                // Agregar evento "change" al checkbox
                const checkbox = divProducto.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        // Si el checkbox está marcado, agregar el párrafo al elemento factura
                        const paragraph = document.createElement('p');
                        paragraph.textContent = `${producto.producto} - $${producto.precio.toFixed(2)}`;
                        factura.insertBefore(paragraph, factura.lastChild.previousSibling); // Insertar antes del último elemento, que es el total
                        total += producto.precio; // Actualizar el total
                    } else {
                        // Si el checkbox se desmarca, eliminar el párrafo del elemento factura
                        const paragraphs = factura.querySelectorAll('p');
                        paragraphs.forEach(p => {
                            if (p.textContent.includes(producto.producto)) {
                                factura.removeChild(p);
                                total -= producto.precio; // Actualizar el total
                            }
                        });
                    }
    
                    // Verificar si el total es 0 y eliminar el elemento total si es así
                    const totalElement = factura.querySelector('#total');
                    if (total === 0 && totalElement) {
                        factura.removeChild(totalElement);
                    } else {
                        // Actualizar el contenido de la factura con el total
                        if (totalElement) {
                            totalElement.textContent = `Total: $${total.toFixed(2)}`;
                        } else {
                            const newTotalElement = document.createElement('p');
                            newTotalElement.id = 'total';
                            newTotalElement.textContent = `Total: $${total.toFixed(2)}`;
                            factura.appendChild(newTotalElement);
                        }
                    }
                });
    
                container.appendChild(divProducto);
            });
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }
    
    cargarProductos();
    



