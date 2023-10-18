


function validateNombre() {
    var nombreInput = document.getElementById("nombre");
    if (!nombreInput.checkValidity()) {
        nombreInput.classList.add("is-invalid");
    } else {
        nombreInput.classList.remove("is-invalid");
        nombreInput.classList.add("is-valid");
    }
}

function validateApellido() {
    var apellidoInput = document.getElementById("apellido");
    if (!apellidoInput.checkValidity()) {
        apellidoInput.classList.add("is-invalid");
    } else {
        apellidoInput.classList.remove("is-invalid");
        apellidoInput.classList.add("is-valid");
    }
}

function validateEmail() {
    var emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
        emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }
}

function validatePassword1() {
    const password1Input = document.getElementById("password1");
    if (!password1Input.checkValidity()) {
        password1Input.classList.add("is-invalid");
    } else {
        password1Input.classList.remove("is-invalid");
        password1Input.classList.add("is-valid");
    }
}

function validatePassword2() {
    const password1Input = document.getElementById("password1");
    const password2Input = document.getElementById("password2");
    if (password1Input.value !== password2Input.value || password1Input.value === "") {  // || password1Input.value === "" ESTO FUNCIONA si password1 es vacia pero rompe en general 
        password2Input.classList.add("is-invalid");
    } else {
        password2Input.classList.remove("is-invalid");
        password2Input.classList.add("is-valid");
    }
}

function checkTerms() {
    const terminosCheckBox = document.getElementById('terminos-check');
    const botonTerminos = document.getElementById('terminos');
    const mensajeTerminos = document.getElementById("mensajeTerminos");
    if (!terminosCheckBox.checked) {
        console.log('Terminos NO checkeados');
        botonTerminos.style.color = "red";
        mensajeTerminos.innerHTML = "Debe aceptar los términos del servicio";
        terminosCheckBox.classList.add("is-invalid");
        terminosCheckBox.classList.remove("is-valid");
    }
    else {
        console.log('Terminos SI checkeados');
        botonTerminos.style.color = "green";
        mensajeTerminos.innerHTML = "";
        terminosCheckBox.classList.add("is-valid");
        terminosCheckBox.classList.remove("is-invalid");
    }
};

// Lógica de validación cuando se hace clic en "Registrarme"
function validateForm() {
    validateNombre();
    validateApellido();
    validateEmail();
    validatePassword1();
    validatePassword2();
    checkTerms()


    // Agrega event listeners a los campos de entrada para validación en tiempo real
    document.getElementById("nombre").addEventListener("input", validateNombre);
    document.getElementById("apellido").addEventListener("input", validateApellido);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("password1").addEventListener("input", validatePassword1);
    document.getElementById("password2").addEventListener("input", validatePassword2);
    document.getElementById("terminos-check").addEventListener("input", checkTerms);
}



