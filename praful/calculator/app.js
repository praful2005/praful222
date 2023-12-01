const formControl = document.getElementById("form-control");

document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector('input[name="display"]');
    const buttons = document.querySelectorAll('.operator');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.value;

            if (value === '=') {
                display.value = eval(display.value);
            } else if (value === 'AC') {
                display.value = '';
            } else if (value === 'DE') {
                display.value = display.value.toString().slice(0, -1);
            } else {
                display.value += value;
            }
        });
    });
});