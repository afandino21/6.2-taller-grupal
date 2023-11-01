//BOTONES
const url = `https://6542337bf0b8287df1ffada7.mockapi.io/`;
const botonGet1 = document.getElementById('btnGet1');
const btnPost = document.getElementById('btnPost');
const btnPut = document.getElementById('btnPut');
const btnDelete = document.getElementById('btnDelete');
const btnSendChanges = document.getElementById('btnSendChanges')
//INPUTS
let userId = document.getElementById("inputGet1Id");
let inputPostNombre = document.getElementById("inputPostNombre");
let inputPostApellido = document.getElementById("inputPostApellido");
let inputPutId = document.getElementById("inputPutId");
let inputDelete = document.getElementById("inputDelete");

function validateInput() {
    if (inputPostNombre.value === "" || inputPostApellido.value === "") {
        btnPost.disabled = true;
    } else {
        btnPost.disabled = false;
    }
}

inputPostNombre.addEventListener('input', validateInput);
inputPostApellido.addEventListener('input', validateInput);


// document.getElementById('inputPostNombre').addEventListener('input', () => {
//     if (inputPostNombre.value === "" || inputPostApellido.value === "") {
//         btnPost.disabled = true;
//     } else {
//         btnPost.disabled = false;
//     }
// });

// document.getElementById('inputPostApellido').addEventListener('input', () => {

//     if (inputPostNombre.value === "" || inputPostApellido.value === "") {
//         btnPost.disabled = true;
//     } else {
//         btnPost.disabled = false;
//     }
// })

document.getElementById('inputPutId').addEventListener('input', () => {
    if (inputPutId.value === "") {
        btnPut.disabled = true;
        console.log('cambio a inhabilitado');
    } else {
        btnPut.disabled = false;

        console.log('cambio a habilitado');
    }
})

document.getElementById('inputDelete').addEventListener('input', () => {
    if (inputDelete === "") {

        btnDelete.disabled = true;
    } else {
        btnDelete.disabled = false;
    }
})


// Buscar Registro
const results = document.getElementById("results");
botonGet1.addEventListener('click', () => {
    let userId = document.getElementById("inputGet1Id").value;
    console.log(userId);
    showList(userId);
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

            showList("");
        })
        .catch(error => {
            console.error('Error:', error);

            alert("Error al agregar nuevo usuario.");
        });
});

// Modificar Registro

// Listener para boton Modificar
btnPut.addEventListener('click', () => {
    inputPutId = document.getElementById("inputPutId").value;
    let inputPutNombre = document.getElementById("inputPutNombre").value;
    let inputPutApellido = document.getElementById("inputPutApellido").value;
    fetch(`https://6542337bf0b8287df1ffada7.mockapi.io/users/${inputPutId}`)
        .then(response => {
            if (!response.ok) {
                // Si la respuesta del servidor no es exitosa, lanza un error
                throw new Error(`No se pudo cargar la ID: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("inputPutNombre").value = data.name;
            document.getElementById("inputPutApellido").value = data.lastname;
        })
        .catch(error => {
            // Muestra una alerta al usuario
            alert("Usuario no encontrado.");
        });
});
// Listener para boton Guardar
btnSendChanges.addEventListener('click', () => {
    let inputPutId = document.getElementById("inputPutId").value;
    let inputPutNombre = document.getElementById("inputPutNombre").value;
    let inputPutApellido = document.getElementById("inputPutApellido").value;

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
                response.json();
                showList("");
            })
            .then(data => {
                // Mostrar el resultado de la modificación
                console.log(data);
            })
            .catch(error => {
                alert("Usuario no encontrado.");
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
                    showList("");
                } else {
                    // Manejar el error y mostrar una alerta
                    alert("Usuario no encontrado");
                }
            })
            .catch(error => {
                // Manejar el error y mostrar una alerta
                alert("Error al eliminar el usuario");
            });
    }
});


function showList(userId) {
    if (userId === "") {
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
                if (!response.ok) {
                    // Si la respuesta del servidor no es exitosa, lanza un error
                    throw new Error(`No se pudo cargar la ID: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let texto = `
                ID: ${data.id}
                NAME: ${data.name}
                LASTNAME: ${data.lastname}
            `;
                results.innerText = texto;
            })
            .catch(error => {
                // Muestra una alerta al usuario
                alert("Usuario no encontrado.");
            });
    }
};

// function validateID(userId) {
//     let largoRegistro = 0;
//     fetch(url + "users")
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             largoRegistro = data.length;
//             if (userId > largoRegistro) {
//                 alert("Error, usuario no existente.");
//             }
//         })
// }
// validateID(50);


