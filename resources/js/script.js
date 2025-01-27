let memory = 0;
let currOpr = null;
let prevVal = '';
let currVal = '';
 

const display = document.getElementById('display');

clearValue();

// Display Update

function updateDisplay() {
    if (currOpr && currVal === '') {
        display.value = `${prevVal} ${currOpr}`;
    } else if (currOpr) {
        display.value = `${prevVal} ${currOpr} ${currVal}`;
    } else {
        display.value =  prevVal || currVal || '0';
    }
}

// Add Value on Display

function appendValue(value) {
    if (resultDisplayed) {
        prevVal = '';
        currVal = '';
        currOpr = null;
        resultDisplayed = false;
    }
    if (value === '.' && currVal.includes('.')) {
        alert('Invalid input: Decimal point is either misplaced or already present.');
        return;
    }
    if (!currOpr && prevVal !== '' && currVal === '') {
        currVal = prevVal;
        prevVal = '';
    }
    currVal += value;
    updateDisplay();
}

// Clear the Value on Display

function clearValue(){
    currVal='0';
    prevVal='';
    currOpr=null;
    resultDisplayed = false;
    updateDisplay();
}

// Backspace Functionality

function backspace() {
    if (currVal !== '') {
        currVal = currVal.slice(0, -1);
    } else if (currOpr !== null) {
        currOpr = null;
        currVal = prevVal;
        prevVal = '';
    } else if (prevVal !== '') {
        prevVal = prevVal.slice(0, -1);
    }
    updateDisplay();
}


// Set the operator for doing the calculations

function setOpr(opr) {
    if (currVal === '' && prevVal === '') {
        alert('Invalid operation: No number to apply the operator to.');
        return;
    }
    if (prevVal !== '' && currVal !== '') {
        calcRes();
    }
    prevVal = prevVal || currVal;
    currVal = '';
    currOpr = opr;
    resultDisplayed = false;
    updateDisplay();
}

// For calculate and show the result in Display

function calculate() {
    if (currVal === '' || prevVal === '' || !currOpr) {
        alert('Invalid calculation: Missing numbers or operator.');
        return;
    }
    calcRes();
    currOpr = null;
    resultDisplayed = true; 
    updateDisplay();
}

// For calculate Square

function square() {
    let num;
    if (currVal !== '') {
        num = parseFloat(currVal);
    } else if (prevVal !== '' && currOpr === null) {
        num = parseFloat(prevVal);
    } else {
        return;
    }
    const output = num * num;
    currVal = output.toString();
    prevVal = '';
    updateDisplay();
}

// For Calculate the Inverse

function inverse() {
    let num;
    if (currVal !== '') {
        num = parseFloat(currVal);
    } else if (prevVal !== '' && currOpr === null) {
        num = parseFloat(prevVal);
    } else {
        return;
    }
    const output = 1 / num;
    currVal = output.toString();
    prevVal = '';
    updateDisplay();
}
 
// Calculate the operations like +, -  *, /, %

function calcRes() {
    const num1 = parseFloat(prevVal);
    const num2 = parseFloat(currVal);
    let output;

    if (isNaN(num1) || isNaN(num2)) {
        alert('Invalid Input');
        clearValue();
        return;
    }

    switch (currOpr) {
        case '+':
            output = num1 + num2;
            break;
        case '-':
            output = num1 - num2;
            break;
        case '*':
            output = num1 * num2;
            break;
        case '/':
            output = num2 === 0 ? 'Infinity' : num1 / num2;
            break;
        case '%':
            output = num1 % num2;
            break;
        default:
            alert('Unknown Operator');
            return;
    }
    prevVal = output.toString();
    currVal = '';
}

// Change the sign +/- implementation

function changeSign() {
    if(currVal!==''){
        currVal=(parseFloat(currVal)*(-1)).toString();
    }else if(prevVal!=='' && currOpr===null){
        prevVal=(parseFloat(prevVal)*(-1)).toString()
    }
    updateDisplay();
}

// Memory Display

function memDis(){
    const m = document.getElementById('memoryDisplay');
    memoryDisplay.textContent= `Memory:${memory}`;
}

// Memory Save

function mS(){
    if (currVal !== '') {
        memory = parseFloat(currVal); 
    } else if (prevVal !== '') {
        memory = parseFloat(prevVal); 
        prevVal=currVal;
    } else {
        alert('No Value, So We can not Save in Memory');
        return;
    }
    memDis();
}

// Memory Add

function mAdd(){
    if (currVal==='') return;
    memory+=parseFloat(currVal);
    memDis();
}

// Memory Subtract

function mSub() {
    if (currVal==='') return;
    memory-=parseFloat(currVal);
    memDis();
}

// Memory Clear

function mC() {
    memory = 0;
    memDis();
}

// Memory Read

function mR() {
    if (memory === 0) {
        alert('No Value, So We can not Recall Memory');
        return;
    }
    currVal = memory.toString();
    updateDisplay();
}


// Calculate Square Root
function squareRoot() {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num) || num < 0) {
        alert('Invalid Input for Square Root');
        return;
    }
    currVal = Math.sqrt(num).toString();
    prevVal = '';
    updateDisplay();
}

// Calculate Log (Base 10)
function logarithm() {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num) || num <= 0) {
        alert('Invalid Input for Logarithm');
        return;
    }
    currVal = Math.log10(num).toString();
    prevVal = '';
    updateDisplay();
}

// Calculate ln
function naturalLogarithm() {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num) || num <= 0) {
        alert('Invalid Input for Natural Logarithm');
        return;
    }
    currVal = Math.log(num).toString();
    prevVal = '';
    updateDisplay();
}

// Calculate Factorial
function factorial() {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
        alert('Invalid Input for Factorial');
        return;
    }
    let fact = 1;
    for (let i = 1; i <= num; i++) {
        fact *= i;
    }
    currVal = fact.toString();
    prevVal = '';
    updateDisplay();
}

// Calculate Power (x^y)
function power() {
    if (prevVal === '' || currVal === '') {
        alert('Both Base and Exponent are Required');
        return;
    }
    const base = parseFloat(prevVal);
    const exponent = parseFloat(currVal);
    currVal = Math.pow(base, exponent).toString();
    prevVal = '';
    currOpr = null;
    updateDisplay();
}

// Calculate 10^x
function tenPowerX() {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num)) {
        alert('Invalid Input for 10^x');
        return;
    }
    currVal = Math.pow(10, num).toString();
    prevVal = '';
    updateDisplay();
}

// Calculate sin, cos, tan
function trigoFun(func) {
    let num = parseFloat(currVal || prevVal);
    if (isNaN(num)) {
        alert('Invalid Input for Trigonometric Function');
        return;
    }
    const rad = (num * Math.PI) / 180; 
    switch (func) {
        case 'sin':
            currVal = Math.sin(rad).toString();
            break;
        case 'cos':
            currVal = Math.cos(rad).toString();
            break;
        case 'tan':
            currVal = Math.tan(rad).toString();
            break;
    }
    prevVal = '';
    updateDisplay();
}


// Buttons

document.getElementById('btn0').addEventListener('click',()=>appendValue('0'))
document.getElementById('btn1').addEventListener('click',()=>appendValue('1'))
document.getElementById('btn2').addEventListener('click',()=>appendValue('2'))
document.getElementById('btn3').addEventListener('click',()=>appendValue('3'))
document.getElementById('btn4').addEventListener('click',()=>appendValue('4'))
document.getElementById('btn5').addEventListener('click',()=>appendValue('5'))
document.getElementById('btn6').addEventListener('click',()=>appendValue('6'))
document.getElementById('btn7').addEventListener('click',()=>appendValue('7'))
document.getElementById('btn8').addEventListener('click',()=>appendValue('8'))
document.getElementById('btn9').addEventListener('click',()=>appendValue('9'))
document.getElementById('btnDot').addEventListener('click',()=>appendValue('.'))

// Set the Operators 

document.getElementById('btnAddition').addEventListener('click', () => setOpr('+'));
document.getElementById('btnSubtract').addEventListener('click', () => setOpr('-'));
document.getElementById('btnMultiply').addEventListener('click', () => setOpr('*'));
document.getElementById('btnDivide').addEventListener('click', () => setOpr('/'));
document.getElementById('btnMod').addEventListener('click', () => setOpr('%'));

// Functions

document.getElementById('btnClear').addEventListener('click',clearValue);
document.getElementById('btnBackspace').addEventListener('click',backspace);
document.getElementById('btnSquare').addEventListener('click', square);
document.getElementById('btnInverse').addEventListener('click', inverse);
document.getElementById('btnEqual').addEventListener('click', calculate);
document.getElementById('btnPM').addEventListener('click',changeSign)


// Memory

document.getElementById('btnMS').addEventListener('click', mS);
document.getElementById('btnMAdd').addEventListener('click', mAdd);
document.getElementById('btnMSub').addEventListener('click', mSub);
document.getElementById('btnMC').addEventListener('click', mC);
document.getElementById('btnMR').addEventListener('click', mR);


document.getElementById('btnSqrt').addEventListener('click', squareRoot);
document.getElementById('btnLog').addEventListener('click', logarithm);
document.getElementById('btnLn').addEventListener('click', naturalLogarithm);
document.getElementById('btnFact').addEventListener('click', factorial);
document.getElementById('btnPower').addEventListener('click', power);
document.getElementById('btnTenPowerX').addEventListener('click', tenPowerX);
document.getElementById('btnSin').addEventListener('click', () => trigoFun('sin'));
document.getElementById('btnCos').addEventListener('click', () => trigoFun('cos'));
document.getElementById('btnTan').addEventListener('click', () => trigoFun('tan'));

document.addEventListener('DOMContentLoaded',()=>{
    clearValue();
    memDis();
});