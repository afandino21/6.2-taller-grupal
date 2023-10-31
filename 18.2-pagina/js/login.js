// Función para guardar los valores en el localStorage
function guardarValoresEnLocalStorage(event) {
  event.preventDefault();

    const inputNombre = document.getElementById("inputNombre").value;
    const inputApellido = document.getElementById("inputApellido").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputNumCelular = document.getElementById("inputNumeCelular").value;
  
    if (inputApellido && inputEmail.includes("@") && inputNombre && inputNumCelular){
      Swal.fire({
        title: 'you logged in successfully',
        icon: 'success',
    });
    setTimeout(function() {
    // Crear un objeto con los valores
    const datos = {
      nombre: inputNombre,
      apellido: inputApellido,
      email: inputEmail,
      numCelular: inputNumCelular,
    };
        // Guardar el objeto en el localStorage
        localStorage.setItem("datosGuardados", JSON.stringify(datos));
        localStorage.setItem("logueado", "true");
        const logueado = localStorage.getItem("logueado");
        if (logueado === "true"){
        window.location.href = "index.html"
        }
  }, 2000);

  }else{
    Swal.fire({
      title: 'You must fill out all the fields and the email must contain @',
      icon: 'error',
  });
    localStorage.setItem("logueado", "false");
  }
}




document.getElementById("guardarDatos").addEventListener("click", guardarValoresEnLocalStorage)

