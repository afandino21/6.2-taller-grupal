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
    if (inputPostNombre.value.trim() === "" || inputPostApellido.value.trim() === "") {
        btnPost.disabled = true;
    } else {
        btnPost.disabled = false;
    }
    if (inputPutId.value === "") {
        btnPut.disabled = true;
    } else {
        btnPut.disabled = false;
    }
    if (inputDelete.value === "") {
        btnDelete.disabled = true;
    } else {
        btnDelete.disabled = false;
    }
}

inputPostNombre.addEventListener('input', validateInput);
inputPostApellido.addEventListener('input', validateInput);
inputPutId.addEventListener('input', validateInput);
inputDelete.addEventListener('input', validateInput);


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
    const ruta = '/users';
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
    const inputPutId = document.getElementById("inputPutId");
    let inputPutNombre = document.getElementById("inputPutNombre");
    inputPutNombre.value = "";
    let inputPutApellido = document.getElementById("inputPutApellido");
    inputPutApellido.value = "";
    let btnCancelarModal = document.getElementById('btnCancelarModal');
    let boolCancelModal = false;
    const alertError = document.getElementById("alert-error");
    alertError.classList.add("fade");
    fetch(`https://6542337bf0b8287df1ffada7.mockapi.io/users/${inputPutId.value}`)
        .then(response => {
            if (!response.ok) {
                // Si la respuesta del servidor no es exitosa, lanza un error
                throw new Error(`No se pudo cargar la ID: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            inputPutNombre.value = data.name;
            inputPutApellido.value = data.lastname;
        })
        .catch(_ => {

            setTimeout(() => {
                console.log("Usuario no encontrado");
                btnCancelarModal.click();
                alertError.classList.remove("fade");
            }, 500);
            setTimeout(() => {
                alertError.classList.add("fade");
            }, 2000);
        });
});

// Listener para boton Guardar
btnSendChanges.addEventListener('click', () => {
    let inputPutId = document.getElementById("inputPutId").value;
    let inputPutNombre = document.getElementById("inputPutNombre").value.trim();
    let inputPutApellido = document.getElementById("inputPutApellido").value.trim();

    if (inputPutId && inputPutNombre && inputPutApellido) {
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

                // Habilita el botón después de una modificación exitosa
                btnPut.disabled = false;
            })
            .catch(error => {
                //alert("Usuario no encontrado.");
                alertError.classList.remove("fade");
            });
    } else {
        alert("Por favor, ingrese datos validos para la modificación.");
    }
});
// ELIMINAR
btnDelete.addEventListener('click', () => {
    const userId = document.getElementById("inputDelete").value;
    const alertError = document.getElementById("alert-error");
    alertError.classList.add("fade");

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
                    //alert("Usuario no encontrado");
                    alertError.classList.remove("fade");
                    setTimeout(() => {
                        alertError.classList.add("fade");
                    }, 2000);
                }
            })
            .catch(error => {
                // Manejar el error y mostrar una alerta
                alert("Error al eliminar el usuario");
            });
    }
});

// Renderizar lista
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
        const alertError = document.getElementById("alert-error");
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
                alertError.classList.add("fade");
            })
            .catch(error => {
                // Muestra una alerta al usuario
                //alert("Usuario no encontrado.");
                alertError.classList.remove("fade");
            });
    }
};