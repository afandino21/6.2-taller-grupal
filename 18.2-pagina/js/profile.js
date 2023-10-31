// Función para mostrar los valores almacenados en el localStorage en la consola
function mostrarValoresDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem("datosGuardados");
  
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      const datosProfile = document.getElementById("datosProfile");
  
      // Verificar si existe la imagen en los datos
      const imagenURL = datos.imagenURL ? datos.imagenURL : "https://placehold.it/150x150";
  
      // Crear una imagen con la URL
      const profileImage = document.createElement("img");
      profileImage.src = imagenURL;
      profileImage.alt = "Profile Photo";
      profileImage.className = "img-rounded";
      profileImage.id = "profileImage";
  
      console.log("Valores almacenados en el localStorage:", datos);
  
      datosProfile.innerHTML = `
        <center class="m-2">
          ${profileImage.outerHTML}
          <input type="file" id="imageInput" accept="image/*" style="display: none;"><br>
          <button class="mt-2 btn" id="changeImageBtn">Cambiar Imagen</button>
        </center>
        <h1 class="text-center m-3">${datos.nombre} ${datos.apellido}</h1>
        <ul class="list-group">
          <li class="list-group-item">Teléfono: ${datos.numCelular}</li>
          <li class="list-group-item">Email: ${datos.email}</li>
        </ul>
        <center><button class="btn btn-danger mt-5" onclick="logout()">Sing-Off</button></center>
      `;
    } else {
      console.log("No hay valores almacenados en el localStorage.");
  
      // Si no hay valores en el localStorage, muestra la imagen de marcador de posición
      const datosProfile = document.getElementById("datosProfile");
      datosProfile.innerHTML = `
        <center class="m-2">
        <img src="https://placehold.it/150x150" alt="Profile Photo" class="img-rounded" id="profileImage">
        <input type="file" id="imageInput" accept="image/*" style="display: none;"><br>
        <button id="changeImageBtn">Cambiar Imagen</button>
      </center>
    <h1 class="text-center">Nombre Apellido</h1>
    <ul class="list-group">
        <li class="list-group-item">Teléfono: 123456789</li>
        <li class="list-group-item">Email: nombre.apellido@example.com</li>
    </ul>
      `;
    }
  }
  
  // Llamar a la función para mostrar los valores al cargar la página
  mostrarValoresDesdeLocalStorage();
  

  const profileImage = document.getElementById("profileImage");
  const imageInput = document.getElementById("imageInput");
  const changeImageBtn = document.getElementById("changeImageBtn");
  
  // Agregar un evento click al botón para abrir el cuadro de diálogo de archivo
  changeImageBtn.addEventListener("click", () => {
    imageInput.click();
  });
  
  // Agregar un evento change al input de archivo
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
  
        // Guardar la imagen en el array "datos"
        const datosGuardados = localStorage.getItem("datosGuardados");
        if (datosGuardados) {
          const datos = JSON.parse(datosGuardados);
          datos.imagenURL = e.target.result;
          localStorage.setItem("datosGuardados", JSON.stringify(datos));
        }
      };
      reader.readAsDataURL(file);
    }
  });
  