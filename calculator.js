let input = 0;
let currentNumber = 0;
let previousNumber = 0;
let operator = "";
let is_operator = false;
let result = 0;

window.onload = function() {
    let buttons = document.querySelectorAll("button[data-type=button]");
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            userInput(e.target.value);
        });
    });

    let operators = document.querySelectorAll("button[data-type=operator]");
    operators.forEach((op) => {
        op.addEventListener("click", (e) => {
            operator = e.target.value;
            console.log(e.target.value);
            is_operator = true;
        });
    });

    let c = document.querySelector("button[data-type=clear]");
    c.addEventListener("click", clear);

    let equalButton = document.querySelector("button[data-type=equal]");
    equalButton.addEventListener("click", equals);
}

function userInput(userInput) {
    if(currentNumber == 0) {
        currentNumber = userInput;
    }
    else if(is_operator) {
        if(previousNumber == 0) {
            previousNumber = currentNumber;
            currentNumber = userInput;
            operate(operator, previousNumber, currentNumber);
        }
        else if(previousNumber != 0) {
            previousNumber = result; 
            currentNumber = userInput;
            console.log(result);
        }
        is_operator = false;
    }
    else if(currentNumber.includes(".")) {
        currentNumber = currentNumber + "" + userInput.replace(".", "");
    }
    else {
        currentNumber += userInput;
    }
    console.log(previousNumber);
    console.log(currentNumber);
    display(currentNumber);
}

function display(input) {
    document.getElementById("display").value = input;
}

function operate(operator, previousNumber, currentNumber) {
    switch(operator) {
        case '+': 
            add(previousNumber, currentNumber);
            break;
        case '-':
            subtract(previousNumber, currentNumber);
            break;
        case '*':
            multiply(previousNumber, currentNumber);
            break;
        case '/':
            divide(previousNumber, currentNumber);
            break;
        default:
            break;
    }
}

function add(previousNumber, currentNumber) {
    result = Number(previousNumber) + Number(currentNumber);
}

function subtract(previousNumber, currentNumber) {
    result = previousNumber - currentNumber;
}

function multiply(previousNumber, currentNumber) {
    result = previousNumber * currentNumber;
}

function divide(previousNumber, currentNumber) {
    result = previousNumber / currentNumber;
}

function equals() {
    operate(operator, previousNumber, currentNumber);
    document.getElementById("display").value = result;
}

function clear() {
    currentNumber = 0;
    previousNumber = 0;
    operator = "";
    is_operator = false;
    result = 0;
    display(0);
}