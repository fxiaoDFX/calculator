// html elements
const numberButtons = document.querySelectorAll('button.number');   // 0-9 buttons
const operators = document.querySelectorAll('button.operation');    // 7 buttons 
const acButton = document.querySelector('button.clear-all');        // AC
const delButton = document.querySelector('button.delete');          // DEL
const equalsButton = document.querySelector('button.equals');       // =
const previousOperandTxt = document.querySelector('.display .previous-op'); // display
const currentOperandTxt = document.querySelector('.display .current-op');   // display

// operations
function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return y === 0 ? "Cannot divide by 0" : x / y;
}

function power(x , y){
    if(y === 0){
        return 1;
    }
    // For doing roots, using built in power function
    if(!Number.isInteger(y))
        return Math.pow(x , y);
    if(y < 0){
        x = 1/x;
        y = Math.abs(y);
    }
    return x * power(x, y - 1);
}

function factorial(x){
    if(!Number.isInteger(x))
        return "NON-POSITIVE INT ERROR";
    if(x < 0)
        return "NON-POSITIVE INT ERROR";
    if(x === 0)
        return 1;
    return x * factorial(x - 1)
}

function percent(x){
    return x.toString() + '%';
}

function plusMinus(x){
    if(x < 0) 
        return Math.abs(x);
    else 
        return x * -1;
}

// TODO: ALL BELOW FUNCTIONS
let term1 = 0;
let term2 = 0;

const calculator = {
    previousOperandTxt : '123',
    currentOperandTxt : '789',
    operator : '+',

    /**
     * Clears all calculator data
     */
    clear: function(){
        this.previousOperandTxt = '';
        this.currentOperandTxt = '';
        this.operator = '';
    },

    /**
     * Deletes the last most character in calculator's currentOperandTxt
     */
    delete: function(){
        const string = this.currentOperandTxt.slice(0, -1);
        this.currentOperandTxt = string;
    },
    
    // takes user input and puts it into a string
    append: function(number){
        // Check for double .
        if(number === '.' && this.currentOperandTxt.includes('.'))
            return;
        this.currentOperandTxt = number.toString() + this.currentOperandTxt.toString();
    },

    // update display
    updateDisplay: function(){

    }
};

// Update the display of the calculator every time a button is pressed
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.append(numberButton.textContent);
        calculator.updateDisplay();
    })
})


// other buttons
// TODO: takes 2 numbers and an operation
function operate(x, y, op){
    switch(op){
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "÷":
            return divide(x, y);
        case "xʸ":
            return power(x, y);
        case "x!":
            return factorial(x);
    }
}

/**
 * Whenever user enters a number input, update the display
 * @param {number} numberEvent is the number that was entered into the calculator 
 */
function append(numberEvent){
    let string = '';
    string += numberEvent;
    updateDisplay(string);
}
 
/**
 * Takes string of numbers and displays it for the user
 * @param {string} string 
 * @returns 
 */
function updateDisplay(string){
    return string;
}


