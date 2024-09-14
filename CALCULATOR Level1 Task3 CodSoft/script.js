let currentInput = '';
let operator = '';
let firstNumber = '';

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        if (currentInput.length < 15) { // Limit input length
            currentInput += this.textContent;
            updateDisplay(currentInput);
        }
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        if (this.id === 'clear') {
            currentInput = '';
            operator = '';
            firstNumber = '';
            updateDisplay('0');
        } else {
            if (firstNumber === '') {
                firstNumber = currentInput;
                currentInput = '';
                operator = this.textContent;
            } else if (currentInput !== '') {
                firstNumber = calculate(firstNumber, currentInput, operator);
                currentInput = '';
                operator = this.textContent;
                updateDisplay(firstNumber);
            }
        }
    });
});

document.getElementById('decimal').addEventListener('click', function() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});

document.querySelector('.equal').addEventListener('click', function() {
    if (firstNumber !== '' && currentInput !== '' && operator !== '') {
        currentInput = calculate(firstNumber, currentInput, operator);
        firstNumber = '';
        operator = '';
        updateDisplay(currentInput);
    }
});

function updateDisplay(value) {
    document.getElementById('display').textContent = value || '0';
}

function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error'; // Avoid division by zero
        default:
            return 'Error';
    }
}
