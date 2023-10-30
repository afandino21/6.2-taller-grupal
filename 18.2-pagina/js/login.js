// Función para guardar los valores en el localStorage
function guardarValoresEnLocalStorage() {
    const inputNombre = document.getElementById("inputNombre").value;
    const inputApellido = document.getElementById("inputApellido").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputNumCelular = document.getElementById("inputNumeCelular").value;
  
    // Crear un objeto con los valores
    const datos = {
      nombre: inputNombre,
      apellido: inputApellido,
      email: inputEmail,
      numCelular: inputNumCelular,
    };
  
    // Guardar el objeto en el localStorage
    localStorage.setItem("datosGuardados", JSON.stringify(datos));
  }
  
  // Agregar un evento click al botón para guardar los valores
  document.getElementById("guardarDatos").addEventListener("click", guardarValoresEnLocalStorage);
  
