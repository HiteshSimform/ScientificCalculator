let eqn = '';
let memory = 0;

const display = document.getElementById('display');
clearValue();
function clearValue() {
    eqn = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = eqn || '0';
}


function appendValue(value) {
    if (eqn === '0' && value === '0') {
        return; 
    }

    
    if (/[+\-*/%]/.test(value) && /[+\-*/%]$/.test(eqn)) {
        eqn = eqn.slice(0, -1) + value;
        updateDisplay();
        return;
    }

    if (value === '-' && (eqn === '' || /[+\-*/%]$/.test(eqn))) {
        eqn += value;
        updateDisplay();
        return;
    }

    if (value === '.' && (eqn.endsWith('.') || eqn.split(/[+\-*/%()]/).pop().includes('.'))) {
        alert('Invalid input: Too many decimal points.');
        return;
    }

    if (eqn === '' && value === '-') {
        eqn = '-';
        updateDisplay();
        return;
    }

    if (eqn.endsWith('+') && value === '-') {
        eqn = eqn.slice(0, -1) + '-';
        updateDisplay();
        return;
    }

    if (eqn.endsWith('-') && value === '+') {
        eqn = eqn.slice(0, -1) + '+';
        updateDisplay();
        return;
    }

    if (/[+\-*/%]$/.test(eqn) && value === '-') {
        eqn += value;
        updateDisplay();
        return;
    }

    eqn += value;
    updateDisplay();
}




function backspace() {
    eqn = eqn.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (eqn.trim() === "" || /[+\-*/%]$/.test(eqn)) {
        alert('Invalid eqn');
        return;
    }

    if (eqn.startsWith('-') && /^[0-9]/.test(eqn.slice(1))) {
        eqn = '0' + eqn;
    }

    try {
        const result = calculateEquation(eqn);
        eqn = result.toString();
    } catch (e) {
        alert('Invalid eqn');
        eqn = '';
    }
    updateDisplay();
}




const prec = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2
};

function calculateEquation(expr) {
    for (let char of expr) {
        if (!'0123456789+-*/%.() '.includes(char)) {
            throw new Error('Invalid characters in eqn');
        }
    }


    function applyOperator(operators, values) {
        const operator = operators.pop();
        const currVal = values.pop();
        const prevVal = values.pop();
        let result;

        switch (operator) {
            case '+':
                result = prevVal + currVal;
                break;  
            case '-':
                result = prevVal - currVal;
                break;
            case '*':
                result = prevVal * currVal;
                break;
            case '/':
                result = prevVal / currVal;
                break;
            case '%':
                result = prevVal % currVal;
                break;
        }
        values.push(result);
    }

    function parseequation(expr) {
        const operators = [];
        const values = [];
        let i = 0;

        while (i < expr.length) {
            let char = expr[i];
            if (char === ' ') {
                i++;
                continue;
            }
            if (/[0-9.]/.test(char)) {
                let number = '';
                while (i < expr.length && /[0-9.]/.test(expr[i])) {
                    number += expr[i];
                    i++;
                }
                values.push(parseFloat(number));
            } else if (char === '(') {
                operators.push(char);
                i++;
            } else if (char === ')') {
                while (operators[operators.length - 1] !== '(') {
                    applyOperator(operators, values);
                }
                operators.pop();
                i++;
            } else if (prec[char] !== undefined) {
                while (
                    operators.length &&
                    operators[operators.length - 1] !== '(' &&
                    prec[operators[operators.length - 1]] >= prec[char]
                ) {
                    applyOperator(operators, values);
                }
                operators.push(char);
                i++;
            }
        }

        while (operators.length) {
            applyOperator(operators, values);
        }

        return values.pop();
    }

    return parseequation(expr);
}


function memDis() {
    const memoryDisplay = document.getElementById('memoryDisplay');
    memoryDisplay.textContent = `Memory: ${memory}`;
}

function mS() {
    if (eqn.trim()) {
        memory = parseFloat(calculateEquation(eqn));
        memDis();
    } else {
        alert('No eqn to store');
    }
}


function mAdd() {
    if (eqn) {
        memory += parseFloat(calculateEquation(eqn));
        memDis();
    }
}

function mSub() {
    if (eqn) {
        memory -= parseFloat(calculateEquation(eqn));
        memDis();
    }
}

function mC() {
    memory = 0;
    memDis();
}

function mR() {
    if (memory !== 0) {
        eqn += memory.toString();
        updateDisplay();
    }
    else {
        alert('No Value, So We can not Recall Memory');
        return;
    }
}

function inverse() {
    if (eqn !== '') {
        let num = parseFloat(eqn);
        if (isNaN(num)) {
            alert('Invalid number');
            return;
        }
        const output = 1 / num;
        eqn = output.toString();
        updateDisplay();
    }
}


function square() {
    let num;
    if (eqn !== '') {
        num = parseFloat(eqn);
    } else {
        return;
    }
    const output = num * num;
    eqn = output.toString();
    updateDisplay();
}

function changeSign() {
    if (eqn.trim() === "") return;

    const regex = /-?\d+(\.\d+)?$/;
    const match = eqn.match(regex);

    if (match) {
        const lastNumber = match[0]; 
        const index = match.index;

        if (lastNumber.startsWith("-")) {
            eqn =
                eqn.slice(0, index) + lastNumber.slice(1) + eqn.slice(index + lastNumber.length);
        } else {
            eqn =
                eqn.slice(0, index) + "-" + lastNumber + eqn.slice(index + lastNumber.length);
        }

        updateDisplay();
    }
}


// Function for square root
function sqrt() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.sqrt(value);
}

// Function for log base 10
function log() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.log10(value);
}

// Function for ln
function ln() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.log(value);
}

// Function for factorial
function factorial() {
    const display = document.getElementById('display');
    let value = parseInt(display.value);
    if (value < 0) {
        alert('Factorial of negative numbers is not defined.');
        return;
    }
    let result = 1;
    for (let i = 2; i <= value; i++) {
        result *= i;
    }
    display.value = result;
}

// x^y
function power() {
    const display = document.getElementById('display');
    const base = parseFloat(display.value);
    const exponent = parseFloat(prompt('Enter the exponent (y):'));
    display.value = Math.pow(base, exponent);
}

// 10^x
function tenPowerX() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.pow(10, value);
}

// sin
function sin() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.sin((value * Math.PI) / 180); // Convert to radians
}

// cos
function cos() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.cos((value * Math.PI) / 180); // Convert to radians
}

// tan
function tan() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    display.value = Math.tan((value * Math.PI) / 180); // Convert to radians
}


// Buttons
document.getElementById('btn0').addEventListener('click', () => appendValue('0'));
document.getElementById('btn1').addEventListener('click', () => appendValue('1'));
document.getElementById('btn2').addEventListener('click', () => appendValue('2'));
document.getElementById('btn3').addEventListener('click', () => appendValue('3'));
document.getElementById('btn4').addEventListener('click', () => appendValue('4'));
document.getElementById('btn5').addEventListener('click', () => appendValue('5'));
document.getElementById('btn6').addEventListener('click', () => appendValue('6'));
document.getElementById('btn7').addEventListener('click', () => appendValue('7'));
document.getElementById('btn8').addEventListener('click', () => appendValue('8'));
document.getElementById('btn9').addEventListener('click', () => appendValue('9'));
document.getElementById('btnDot').addEventListener('click', () => appendValue('.'));

// Operators
document.getElementById('btnAddition').addEventListener('click', () => appendValue('+'));
document.getElementById('btnSubtract').addEventListener('click', () => appendValue('-'));
document.getElementById('btnMultiply').addEventListener('click', () => appendValue('*'));
document.getElementById('btnDivide').addEventListener('click', () => appendValue('/'));
document.getElementById('btnMod').addEventListener('click', () => appendValue('%'));

// Functions
document.getElementById('btnClear').addEventListener('click', clearValue);
document.getElementById('btnBackspace').addEventListener('click', backspace);
document.getElementById('btnEqual').addEventListener('click', calculate);
document.getElementById('btnInverse').addEventListener('click', inverse);
document.getElementById('btnSquare').addEventListener('click', square);
document.getElementById("btnPM").addEventListener("click", changeSign);

// Memory
document.getElementById('btnMS').addEventListener('click', mS);
document.getElementById('btnMAdd').addEventListener('click', mAdd);
document.getElementById('btnMSub').addEventListener('click', mSub);
document.getElementById('btnMC').addEventListener('click', mC);
document.getElementById('btnMR').addEventListener('click', mR);

// Tigo, Log, Factorial and Power
document.getElementById('btnSqrt').addEventListener('click', sqrt);
document.getElementById('btnLog').addEventListener('click', log);
document.getElementById('btnLn').addEventListener('click', ln);
document.getElementById('btnFact').addEventListener('click', factorial);
document.getElementById('btnPower').addEventListener('click', power);
document.getElementById('btnTenPowerX').addEventListener('click', tenPowerX);
document.getElementById('btnSin').addEventListener('click', sin);
document.getElementById('btnCos').addEventListener('click', cos);
document.getElementById('btnTan').addEventListener('click', tan);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    clearValue();
    memDis();
});