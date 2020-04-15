var previousDisplay = '';
var displayValue = '0';
var operand1 = '0';
var operand2 = '';
var operator = '';

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(op, x, y) {
    console.log(x + " " + op + " " + y);
    x = parseFloat(x);
    y = parseFloat(y);
    switch(op) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case 'x':
            return multiply(x,y);
        case '÷':
            if (y == 0) {
                return NaN;
            } else {
                return divide(x,y);
            }
        default:
            console.log("Error. Invalid operator input recieved: " + op);
            return NaN;
    }
}

function updateDisplay() {
    if (displayValue.includes('NaN')) {
        clearDisplay();
        displayValue = 'Error!';
    }
    document.getElementById('main-display').textContent = displayValue;
    document.getElementById('second-display').textContent = previousDisplay;
}

function clearDisplay() {
    previousDisplay = '';
    displayValue = '0';
    operand1 = '0';
    operand2 = '';
    operator = '';
    document.getElementById('main-display').textContent = displayValue;
    document.getElementById('second-display').textContent = previousDisplay;
}

function deleteChar() {
    if (displayValue != '0') {
        if (operand2 != '') {
            operand2 = operand2.substring(0, operand2.length - 1);
            displayValue = operand1 + operator + operand2;
        } else if (operator != '') {
            if (operator == '=') {
                operand1 = operand1.substring(0, operand1.length - 1);
                operator = '';
                displayValue = operand1;
            } else {
                operator = '';
                displayValue = operand1;
            }
        } else {
            operand1 = operand1.substring(0, operand1.length - 1);
            if (operand1 == '-') {
                operand1 = '';
            }
            displayValue = operand1;
        }
    }
    updateDisplay();
}

function negative() {
    if (displayValue != '') {
        if (operand2 != '') {
            operand2 = operate('x', '-1', operand2).toString();
            displayValue = operand1 + operator + operand2;
        } else if (operator != '') {
            if (operator == '=') {
                operand1 = operate('x', '-1', operand1).toString();
                displayValue = operand1;
            } else {
                operand2 = '-';
                displayValue = operand1 + operator + operand2;
            }
        } else {
            operand1 = operate('x', '-1', operand1).toString();
            displayValue = operand1;
        }
    } else {
        operand1 = '-0';
        displayValue = operand1;
    }
    updateDisplay();
}

function addOperand(element) {
    input = element.textContent;
    if (displayValue == '') {
        // case 1: display is empty
        if (input == '.') {
            operand1 = '0' + input;
        } else {
            operand1 = input;
        }
        displayValue = operand1;
    } else if (operator == '') { 
        // case 2: operator hasnt been clicked.
        // still concating 1st operand
        // check for multiple '.' in 1st operand 
        if(input == '.' && operand1.includes('.')) {
            clearDisplay();
            displayValue = "Error! Use only one decimal";
        } else {
            if(operand1 == '-0' && input != '.') {
                operand1 = '-';
                operand1 += input;
            } else if (operand1 == '0') {
                if (input == '.') {
                    operand1 += input;
                } else {
                    operand1 = input;
                }
            } else {
                operand1 += input;
            }
            displayValue = operand1;
        }
    } else {
        // case 3: operator selected
        // concating 2nd operand
        // check for for multiple '.' in 2nd operand
        if (operator == '=') {
            clearDisplay();
            if (input == '.') {
                operand1 = '0' + input;
            } else {
                operand1 = input;
            }
            displayValue = operand1;
        } else if(input == '.' && operand2.includes('.')) {
            clearDisplay();
            displayValue = "Error! Use only one decimal";
        } else {
            if (input == '.' && operand2 == '') {
                operand2 = '0' + input;
            } else {
                operand2 += input;
            }
            displayValue = operand1 + operator + operand2;
        }
    }
    updateDisplay();
}

function addOperator(element) {
    input = element.textContent;
    if (operand1 == '' || operand1 == '.' || operand1 == '-.') {
        // case 1: no operand input
        clearDisplay();
        displayValue = "Error! Enter value first";
    } else if (operator == '' || operator == '=') {
        // case 2: operand1 input with no operator
        // check for invalid equals input
        if (input == '=') {
            if (operator == ''){

            } else if (operator == '=') {

            } else {
                clearDisplay();
                displayValue = "Error! Enter second value";
            }
        } else {
            operator = input;
            displayValue = operand1 + operator;
        }
    } else {
        // case 3: eval equation
        if(operand2 == '' || operand2 == '-' || operand2 == '.') {
            clearDisplay();
            displayValue = "Error! Enter second value";
        } else {
            previousDisplay = displayValue;
            operand1 = operate(operator, operand1, operand2).toString();
            if (operand1 == 'NaN') {
                clearDisplay();
                displayValue = "Error! Divided by 0";
            } else {
                operator = input;
                operand2 = '';
                if (operator != '=') {
                    displayValue = operand1 + operator;
                } else {
                    displayValue = operand1;
                }
            }
        }
    }
    updateDisplay();
}