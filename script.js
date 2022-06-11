// html elements
const numberButtons = document.querySelectorAll('button.number');   // 0-9 buttons
const operators = document.querySelectorAll('button.operation');    // + - * ÷
const percentButton = document.querySelector('button.percentage');  // %
const factorialButton = document.querySelector('.factorial');       // x!
const squareButton = document.querySelector('button.square');
const acButton = document.querySelector('button.clear-all');        // AC
const delButton = document.querySelector('button.delete');          // DEL
const equalsButton = document.querySelector('button.equals');       // =
const previousPtr = document.querySelector('.display .previous-operand-element');
const currentPtr = document.querySelector('.display .current-operand-element');   


// TODO: ALL BELOW FUNCTIONS

const calculator = {
    previousOperand : '0',    
    currentOperand: '',
    operator : '',

    /**
     * Clears all calculator data
     */
    clear: function(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
    },

    /**
     * Deletes the last most character in calculator's currentOperandTxt
     */
    delete: function(){
        const string = this.currentOperand.slice(0, -1);
        this.currentOperand = string;
    },
    
    // takes user input and puts it into a string
    append: function(numberButton){
        let num = numberButton.toString();
        // Check for double .
        if(numberButton === '.' && this.currentOperand.includes('.'))
            return;
        // positive or negative button
        if(numberButton === '+/-'){
            if(this.currentOperand === '')
                return;
             num = plusMinus(this.currentOperand);
             this.currentOperand = num;
             return;
        }
        // Check if = button was last pressed to clear display when pressing num button
         if(this.operator === '='){
             this.currentOperand = '';
             this.operator = '';
         }
        this.currentOperand = this.currentOperand.toString() + num;
    },

    // update display
    updateDisplay: function(){
        // Update display when number is pressed
        currentPtr.textContent = this.currentOperand;
        previousPtr.textContent = this.previousOperand;
    },
};

calculator.updateDisplay();

/* EVENT LISTENERS */
// Update the display of the calculator every time a button is pressed

// DEL button
delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

// AC button
acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

// num buttons
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        calculator.append(numberButton.textContent);
        calculator.updateDisplay();
    })
});

// operation buttons
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        // Allow stringing of operations
        if(calculator.previousOperand != '' && calculator.currentOperand != '' && calculator.operator != ''){
            operate(calculator.currentOperand, calculator.previousOperand, calculator.operator);
            calculator.updateDisplay();
        }
        // get operator type
        calculator.operator = operator.textContent;
        // after pressing button, save current display into previous and then clear current display
        calculator.previousOperand = currentPtr.textContent;
        calculator.currentOperand = '';
    })
});

// = button
equalsButton.addEventListener('click', () => {
    if(calculator.previousOperand != '' && calculator.currentOperand != '' && calculator.operator != ''){
        operate(calculator.currentOperand, calculator.previousOperand, calculator.operator);
        calculator.updateDisplay();
        calculator.operator = '=';
    }else
        return;
})

// percent button
percentButton.addEventListener('click', () => {
    let percentage = percent(calculator.currentOperand);
    calculator.currentOperand = percentage;
    calculator.updateDisplay();

})

// x! button
factorialButton.addEventListener('click', () => {
    let x = factorial(parseFloat(calculator.currentOperand));
    calculator.currentOperand = x;
    calculator.updateDisplay();
})

// power button
squareButton.addEventListener('click', () => {
    let x = square(parseFloat(calculator.currentOperand));
    calculator.currentOperand = x;
    calculator.updateDisplay();
})

/**
 * Takes 2 string of numbers, converts them to float, and then evaluates
 * @param {string} string1 1st operand
 * @param {string} string2 2nd operand
 * @param {string} op is the operation to be performed on the 2 strings
 * @returns nothing 
 */
function operate(string1, string2, op){
    let current = parseFloat(string1);
    let previous = parseFloat(string2);
    let answer = 0;
    switch(op) {
        case '+':
            answer = add(current, previous);
            break;
        case '-':
            answer = subtract(previous, current);
            break;
        case '*':
            answer = multiply(current, previous);
            break;
        case '÷':
            answer = divide(previous, current);
            break;
        default: 
            return;
    }
    calculator.currentOperand = answer.toString();
}

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

function square(x){
    if(x === '')
        return;
    return x * x;
}

function factorial(x){
    if(!Number.isInteger(x))
        return "DOMAIN ERROR";
    if(x < 0)
        return "DOMAIN ERROR";
    if(x === 0)
        return 1;
    return x * factorial(x - 1)
}

// display current term as percent, take that string and covert it to num
function percent(string){
    x = parseFloat(string);
    return (x/100).toString();
}

/**
 * 
 * @param {string} string is a number in string form
 * @returns a number in as a string
 */
function plusMinus(string){
    x = parseFloat(string);
    if(x === 0)
        return;
    if(x < 0) 
        return Math.abs(x).toString();
    else 
        return (x * -1).toString();
}