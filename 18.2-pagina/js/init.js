function login(){
    localStorage.setItem("logueado", "true")
    window.location.href = "index.html";
}
function logout(){
    localStorage.setItem("logueado", "false")
    window.location.href = "login.html";
}
function irAlLogin(){
    window.location.href = "login.html"
}

const logueado = localStorage.getItem("logueado");

function cambiarInPorOut() {
    var claseLogin = document.querySelectorAll(".btnlogin");
    var datos = localStorage.getItem("datosGuardados");
    var tratarDatos = JSON.parse(datos);

    for (var i = 0; i < claseLogin.length; i++) {
    claseLogin[i].textContent = tratarDatos.email;

      // Agregar un controlador de eventos de clic para redirigir a profile.html
    claseLogin[i].addEventListener("click", function() {
        window.location.href = "profile.html";
            });
        }
    }

function cambiarOutPorIn(){
    var claseLogin = document.querySelectorAll(".btnlogin");
    for (var i = 0; i < claseLogin.length; i++) {
        claseLogin[i].textContent = "Sing-In";

      // Agregar un controlador de eventos de clic para redirigir a profile.html
        claseLogin[i].addEventListener("click", function() {
        window.location.href = "login.html";
        });
    }
}  

    if (logueado === "true") {
        cambiarInPorOut();
    }else if (logueado === "false"){
        cambiarOutPorIn();
        window.location.href = "login.html";
    }else if (!logueado){
        cambiarOutPorIn()
    }
    