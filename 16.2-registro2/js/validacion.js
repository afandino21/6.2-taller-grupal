const botonRegistrar = document.getElementById('botonRegistro');
botonRegistrar.addEventListener('submit', function (e) {

    e.preventDefault(e);
    validateForm();
    console.log("primer chequeo")
    document.addEventListener('input', function (e) {
        validateForm();
        console.log('aca funciona de continuo')
    });
});
function validateForm() {
    // Obtenemos referencias a los campos del formulario
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const password1Input = document.getElementById("password1");
    const password2Input = document.getElementById("password2");
    const terminos = document.getElementById('terminos');


    // Validamos que los campos no estén vacíos
    if (!nombreInput.checkValidity()) {
        nombreInput.classList.add("is-invalid");
    } else {
        nombreInput.classList.remove("is-invalid");
        nombreInput.classList.add("is-valid");
    }

    if (!apellidoInput.checkValidity()) {
        apellidoInput.classList.add("is-invalid");
    } else {
        apellidoInput.classList.remove("is-invalid");
        apellidoInput.classList.add("is-valid");
    }

    if (!emailInput.checkValidity()) {
        emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }

    if (!password1Input.checkValidity()) {
        password1Input.classList.add("is-invalid");
    } else {
        password1Input.classList.remove("is-invalid");
        password1Input.classList.add("is-valid");
    }

    // Validamos que las contraseñas coincidan
    if (password1Input.value !== password2Input.value) {
        password2Input.classList.add("is-invalid");
    } else {
        password2Input.classList.remove("is-invalid");
        password2Input.classList.add("is-valid");
    }
}
