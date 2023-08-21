document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('buttonText');
    const inputData = document.getElementById('inputText');

    saveButton.addEventListener('click', () => {
        const data = inputData.value;
        localStorage.setItem('userData', data);
    });
});