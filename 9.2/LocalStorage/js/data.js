// al cargar el contenido de Dom se definen dos constantes

document.addEventListener('DOMContentLoaded', () => {
    const dataDisplay = document.getElementById('data');
    const storedData = localStorage.getItem('userData');

    if (storedData) {
        dataDisplay.textContent = `Dato almacenado: ${storedData}`;
    } else {
        dataDisplay.textContent = 'No se encontraron datos almacenados.';
    }
});