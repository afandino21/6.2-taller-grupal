localStorage.setItem('miItem', JSON.stringify(true));

function login() {
    // Para verificar si el item es falso
    const miItem = localStorage.getItem('miItem');
    if (miItem !== null) {
        const esFalso = JSON.parse(miItem);
        if (esFalso === false) {
            window.location.href = "login.html"
            console.log('El item es falso.');
        } else {
            window.location.href = "index.html"
            console.log('El item no es falso.');
        }
    } else {
        // El item no existe en localStorage
        console.log('El item no existe en localStorage.');
    }
}

//login()