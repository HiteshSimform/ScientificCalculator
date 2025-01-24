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
    currVal='';
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
