var displayValue = '';
var operand1 = '';
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
    console.log(x + op + y);
    x = parseFloat(x);
    y = parseFloat(y);
    switch(op) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case 'x':
            return multiply(x,y);
        case '/':
            if (y == 0) {
                return NaN;
            } else {
                return divide(x,y);
            }
        default:
            console.log("Error! invalid input recieved: " + op);
    }
}

function updateDisplay() {
    document.getElementById('display').innerHTML = displayValue;
}

function clearDisplay() {
    document.getElementById('display').innerHTML = '';
    displayValue = '';
    operand1 = '';
    operand2 = '';
    operator = '';
}

function addOperand(element) {
    input = element.innerHTML;
    if (displayValue == '') {
        // case 1: display is empty
        operand1 += input;
        displayValue = operand1;
    } else if (operator == '') { 
        // case 2: operator hasnt been clicked.
        // still concating 1st operand
        // check for multiple '.' in 1st operand 
        if(input == '.' && operand1.includes('.')) {
            clearDisplay();
            displayValue = "Error!";
        } else {
            operand1 += input;
            displayValue = operand1
        }
    } else {
        // case 3: operator selected
        // concating 2nd operand
        // check for for multiple '.' in 2nd operand
        if (operator == '=') {
            clearDisplay();
            operand1 = input;
            displayValue = operand1;
        } else if(input == '.' && operand2.includes('.')) {
            clearDisplay();
            displayValue = "Error!";
        } else {
            operand2 += input;
            displayValue = operand1 + operator + operand2;
        }
    }
    updateDisplay();
}

function addOperator(element) {
    input = element.innerHTML;
    if (operand1 == '') {
        // case 1: no operand input
        clearDisplay();
        displayValue = "Error!";
    } else if (operator == '') {
        // case 2: operand1 input with no operator
        // check for invalid equals input
        if (input == '=') {
            clearDisplay();
            displayValue = "Error!";
        } else {
            operator = input;
            displayValue = operand1 + operator;
        }
    } else {
        // case 3: eval equation
        if(operand2 == '') {
            clearDisplay();
            displayValue = "Error!";
        } else {
            operand1 = operate(operator, operand1, operand2).toString();
            if (operand1 == 'NaN') {
                clearDisplay();
                displayValue = "Error!";
            } else {
                operator = input;
                operand2 = '';
                if (input != '=') {
                    displayValue = operand1 + operator;
                } else {
                    displayValue = operand1;
                }
            }
        }
    }
    updateDisplay();
}