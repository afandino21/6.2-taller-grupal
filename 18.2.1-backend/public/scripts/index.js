//BOTONES
const url = `https://6542337bf0b8287df1ffada7.mockapi.io/`;
const botonGet1 = document.getElementById('btnGet1');
const btnPost = document.getElementById('btnPost');
const btnPut = document.getElementById('btnPut');
const btnDelete = document.getElementById('btnDelete');
const btnSendChanges = document.getElementById('btnSendChanges')

// Buscar Registro
const results = document.getElementById("results");
botonGet1.addEventListener('click', () => {
    let userId = document.getElementById("inputGet1Id").value;
    console.log(userId);
    if (userId === "") {
        console.log(url + "users");
        fetch(url + "users")
            .then(response => {
                return response.json();
            })
            .then(data => {

                let texto = "";
                data.forEach(item => {
                    texto += `ID: ${item.id}
                NAME: ${item.name}
                LASTNAME: ${item.lastname}
                `;
                });
                results.innerText = texto;

            })
            .catch(error => {
                console.log('No se pudieron cargar los datos');
            });
    } else {
        fetch(`https://6542337bf0b8287df1ffada7.mockapi.io/users/${userId}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let texto = "";
                texto = `
            ID: ${data.id}
            NAME: ${data.name}
            LASTNAME: ${data.lastname}

            `;

                results.innerText = texto;

            })
            .catch(error => {
                console.log('No se pudo cargar la id');
            });
    }
});

// Ingresar nuevo registro
btnPost.addEventListener('click', () => {
    const inputPostNombre = document.getElementById("inputPostNombre").value;
    const inputPostApellido = document.getElementById("inputPostApellido").value;
    const ruta = '/users'; // Ruta a la que deseas agregar un elemento
    const elementoAgregado = {
        // Datos del elemento que deseas agregar
        name: inputPostNombre,
        lastname: inputPostApellido,
    };

    // Configura las opciones para la solicitud POST
    const opciones = {
        method: 'POST', // Método de solicitud, generalmente POST para agregar un elemento
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido JSON
        },
        body: JSON.stringify(elementoAgregado), // Convierte el objeto a formato JSON
    };

    // Combina la URL base con la ruta para obtener la URL completa
    const urlCompleta = url + ruta;

    // Realiza la solicitud Fetch
    fetch(urlCompleta, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el elemento');
            }
            return response.json(); // Puedes parsear la respuesta si la API devuelve datos adicionales
        })
        .then(data => {
            // Maneja la respuesta de la API después de agregar el elemento
            console.log(data);
            let texto = "";
            texto = `
        ID: ${data.id}
        NAME: ${data.name}
        LASTNAME: ${data.lastname}

        `;
            results.innerText = texto;

            fetch(urlCompleta)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    let texto = "";
                    data.forEach(item => {
                        texto += `
                ID: ${item.id}
                NAME: ${item.name}
                LASTNAME: ${item.lastname}
                `;
                    });
                    results.innerText = texto;

                })
                .catch(error => {
                    console.log('No se puede mostrar la lsita de usuarios');
                });

        })
        .catch(error => {
            // Maneja errores de red u otros errores
            console.error('Error:', error);
        });
});

// MODIFICAR
btnPut.addEventListener('click', () => {
    const inputPutId = document.getElementById("inputPutId").value;
    const inputPutNombre = document.getElementById("inputPutNombre").value;
    const inputPutApellido = document.getElementById("inputPutApellido").value;

    if (inputPutId) {
        const ruta = `/users/${inputPutId}`; // Ruta con el ID del usuario a modificar
        const updatedUser = {
            name: inputPutNombre,
            lastname: inputPutApellido,
        };

        const opciones = {
            method: 'PUT', // Método de solicitud
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido JSON
            },
            body: JSON.stringify(updatedUser), // Convierte el objeto a formato JSON
        };

        const urlCompleta = url + ruta;

        fetch(urlCompleta, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al modificar el usuario');
                }
                return response.json();
            })
            .then(data => {
                // Mostrar el resultado de la modificación
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert("Por favor, ingrese un ID válido para la modificación.");
    }
});

// ELIMINAR
btnDelete.addEventListener('click', () => {
    const userId = document.getElementById("inputDelete").value;

    if (userId) {
        const ruta = `/users/${userId}`; // Ruta con el ID del usuario a eliminar

        fetch(url + ruta, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Lógica para manejar el éxito (por ejemplo, actualizar la lista en el HTML)
                    // También puedes limpiar el campo de entrada
                    document.getElementById("inputDelete").value = '';
                } else {
                    // Manejar el error y mostrar una alerta
                    alert("Error al eliminar el usuario.");
                }
            })
            .catch(error => {
                // Manejar el error y mostrar una alerta
                alert("Error de red al intentar eliminar el usuario.");
            });
    } else {
        // Mostrar un mensaje al usuario indicando que debe ingresar un ID
        alert("Por favor, ingrese un ID válido para la eliminación.");
    }
});
