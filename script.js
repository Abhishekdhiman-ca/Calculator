document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('current-input');
    const history = document.getElementById('history');
    let currentInput = '0';
    let currentHistory = '';

    const updateDisplay = () => {
        display.textContent = currentInput;
        history.textContent = currentHistory;
    };

    const handleNumberInput = (number) => {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const handleOperatorInput = (operator) => {
        currentInput += operator;
        updateDisplay();
    };

    const handleFunctionInput = (func) => {
        currentInput += `${func}(`;
        updateDisplay();
    };

    const handleClear = () => {
        currentInput = '0';
        currentHistory = '';
        updateDisplay();
    };

    const handleBackspace = () => {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
        updateDisplay();
    };

    const handleEquals = () => {
        try {
            const result = math.evaluate(currentInput);
            currentHistory = `${currentInput} =`;
            currentInput = result.toString();
            updateDisplay();
        } catch (error) {
            currentInput = 'Error';
            updateDisplay();
            setTimeout(() => {
                currentInput = '0';
                updateDisplay();
            }, 1000);
        }
    };

    const handleButtonClick = (action) => {
        if (!isNaN(action) || action === '.') {
            handleNumberInput(action);
        } else if (['+', '-', '*', '/', '(', ')'].includes(action)) {
            handleOperatorInput(action);
        } else if (['sin', 'cos', 'tan', 'sqrt'].includes(action)) {
            handleFunctionInput(action);
        } else if (action === 'clear') {
            handleClear();
        } else if (action === 'backspace') {
            handleBackspace();
        } else if (action === '=') {
            handleEquals();
        }
    };

    // Mouse click event listeners
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.dataset.action);
        });
    });

    // Keyboard event listener
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        // Prevent default action for some keys
        if (['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Delete', 'c', 'C'].includes(key)) {
            event.preventDefault();
        }

        // Map keyboard keys to calculator actions
        const keyMappings = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
            '(': '(', ')': ')',
            'Enter': '=', '=': '=',
            'Backspace': 'backspace', 'Delete': 'backspace',
            'c': 'clear', 'C': 'clear'
        };

        const action = keyMappings[key];
        if (action) {
            handleButtonClick(action);
        }

        // Special case for functions
        if (['s', 'c', 't'].includes(key.toLowerCase())) {
            const functionMappings = { 's': 'sin', 'c': 'cos', 't': 'tan' };
            handleFunctionInput(functionMappings[key.toLowerCase()]);
        }
        if (key.toLowerCase() === 'r') {
            handleFunctionInput('sqrt');
        }
    });

    updateDisplay();
});