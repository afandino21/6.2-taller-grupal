
// Funcion que guarda en userData de localStorage el texto que se agrego en input

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('buttonText');
    const inputData = document.getElementById('inputText');

    saveButton.addEventListener('click', () => {
        const data = inputData.value;
        localStorage.setItem('userData', data); // como referirse a localStorage. Metodos utiles> .setItem ('variable', valor) 
        // getItem('variable') - remover se debe de poder hacer
    });
});
