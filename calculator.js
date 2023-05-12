let output = "";
let currentNumber = "";
let previousNumber = "";
let operator = "";
let is_operator = false;
let result = 0;

window.onload = function () {
    let buttons = document.querySelectorAll("button[data-type=button]");
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            userInput(e.target.value);
        });
    });

    let operators = document.querySelectorAll("button[data-type=operator]");
    operators.forEach((op) => {
        op.addEventListener("click", (e) => {
            is_operator = true;
            chooseOperation(e.target.value);
        });
    });

    let clearButton = document.querySelector("button[data-type=clear]");
    clearButton.addEventListener("click", clear);

    let deleteButton = document.querySelector("button[data-type=delete]");
    deleteButton.addEventListener("click", deleteLast);

    let equalButton = document.querySelector("button[data-type=equal]");
    equalButton.addEventListener("click", equals);
}

function userInput(userInput) {
    if(currentNumber == "") {
        if(operator == '-') {
            currentNumber = userInput * -1;
        }
        else {
            currentNumber = userInput;
        }        
    }
    else if(is_operator) {
        if(previousNumber == "") {
            previousNumber = currentNumber;
            currentNumber = userInput;
            operate(previousNumber, operator, currentNumber);
        }
        else if(previousNumber != "") {
            previousNumber = result; 
            currentNumber = userInput;
            operate(previousNumber, operator, currentNumber);
        }
        is_operator = false;
    }
    else if(userInput == '.' && currentNumber.includes('.')) {
        return;
    }
    else {
        currentNumber += userInput;
    }
    display(previousNumber, operator, currentNumber);
}

function chooseOperation(value) {
    operator = value;
}

function display(previousNumber, operator, currentNumber) {
    if(isNaN(previousNumber) && operator == undefined) {
        output = currentNumber;
    }
    else if(isNaN(previousNumber)) {
        output = currentNumber + operator;
    }
    else {
        output = previousNumber + operator + currentNumber;
    }
    document.getElementById("display").value = output;
}

function operate(operator, previousNumber, currentNumber) {
    switch (operator) {
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
            return;
    }
}

function add(previousNumber, currentNumber) {
    result = Number(previousNumber) + Number(currentNumber);
}

function subtract(previousNumber, currentNumber) {
    result = Number(previousNumber) - Number(currentNumber);
}

function multiply(previousNumber, currentNumber) {
    result = previousNumber * currentNumber;
}

function divide(previousNumber, currentNumber) {
    result = previousNumber / currentNumber;
}

function equals() {
    if(isNaN(previousNumber) || isNaN(currentNumber)) {
        return; 
    }
    else {
        operate(operator, previousNumber, currentNumber);
        document.getElementById("result").value = result;
    }
}

function clear() {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    is_operator = false;
    result = 0;
    document.getElementById("display").value = 0;
    document.getElementById("result").value = "";
}

function deleteLast() {
    document.getElementById("result").value = "";
    currentNumber = currentNumber.slice(0,-1);
    display(previousNumber, operator, currentNumber);
}
