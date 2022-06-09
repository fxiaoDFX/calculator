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
    return 0;
}

function factorial(x){
    if(x < 0)
        return "undefined";
    if(x === 0)
        return 1;
    return x * factorial(x - 1)
    
}


// other buttons
// TODO: takes 2 numbers and an operation
function operate(){
    return 0;
}

// TODO: clears existing data
function clear(){
    return 0; 
}

//TODO: delete the previous button entry
function del(){
    return 0;
}