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
            console.log(e.target.value);
        });
    });

    let operators = document.querySelectorAll("button[data-type=operator]");
    operators.forEach((op) => {
        op.addEventListener("click", (e) => {
            operator = e.target.value;
            console.log(operator);
            is_operator = true;
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
        display(previousNumber, operator, currentNumber);
}



function display(previousNumber, operator, currentNumber) {
    if(operator == '' && previousNumber == 0) {
        output = currentNumber;
    }
    else if(previousNumber == 0) {
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
    document.getElementById("result").value = result;
}

function clear() {
    currentNumber = 0;
    previousNumber = 0;
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