// html elements
const numberButtons = document.querySelectorAll('button.number');   // 0-9 buttons
const operators = document.querySelectorAll('button.operation');    // 6 buttons 
const single = document.querySelector('.single-operation');       // 1 button (factorial)
const acButton = document.querySelector('button.clear-all');        // AC
const delButton = document.querySelector('button.delete');          // DEL
const equalsButton = document.querySelector('button.equals');       // =
const secondary = document.querySelector('.display .secondary'); // display secondary will hold evaluations until = is pressed
const primary = document.querySelector('.display .primary');   // display primary will hold string 

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

const calculator = {
    previousOperandTxt : '',    
    currentOperandTxt: '',
    operator : '',

    /**
     * Clears all calculator data
     */
    clear: function(){
        this.previousOperandTxt = '';
        this.currentOperandTxt = '';
        this.op = '';
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
        this.currentOperandTxt = this.currentOperandTxt.toString() + number.toString();
    },

    // update display
    updateDisplay: function(){
        // Update display when number is pressed
        primary.textContent = this.currentOperandTxt;
        secondary.textContent = this.previousOperandTxt;
    }
};

calculator.clear();
calculator.updateDisplay();

/* EVENT LISTENERS */
// Update the display of the calculator every time a button is pressed

// AC button
acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

// numpad
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.append(numberButton.textContent);
        calculator.updateDisplay();
    })
});

// operation
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.op = operator.textContent;
        // pressing operator a second time acts as equals
        if(calculator.currentOperandTxt != '' && calculator.previousOperandTxt != '' && calculator.op != '' ){
            operate(calculator.currentOperandTxt, calculator.previousOperandTxt, calculator.op);
        }
        calculator.previousOperandTxt = calculator.currentOperandTxt;
        calculator.currentOperandTxt = '';
    })
});

// single-operation
single.addEventListener('click', () => {
    calculator.op = single.textContent;

})

// =
equalsButton.addEventListener('click', () => {
    console.log('equals = ' + calculator.op);
    let currentOperandTxtValue = calculator.currentOperandTxt;
    let previousOperandTxtValue = calculator.previousOperandTxt;
    console.log(calculator);
    operate(currentOperandTxtValue, previousOperandTxtValue, calculator.op);
    calculator.currentOperandTxt = calculator.previousOperandTxt;
    calculator.previousOperandTxt = '';
    calculator.updateDisplay();

});

// other buttons
// TODO: takes 2 numbers and an operation
function operate(currentOperandTxtValue, previousOperandTxtValue, op){
    let x = parseFloat(currentOperandTxtValue);
    let y = parseFloat(previousOperandTxtValue);
    let eval = 0;
    console.log('the operation is ' + typeof(op));
    switch(op){
        case "+":
            eval = add(x, y);
            break;
        case "-":
            console.log('subtract');
            eval = subtract(y, x);
            break;
        case "*":
            console.log('multiply');
            eval = multiply(x, y);
            break;
        case "÷":
            console.log('divide');
            eval = divide(x, y);
            break;
        case "xʸ":
            console.log('power');
            eval = power(x, y);
            break;
        case "x!":
            console.log('factorial');
            eval = factorial(y);
            break;
        default: return;
    }
    calculator.previousOperandTxt = eval;
    calculator.updateDisplay();
}

