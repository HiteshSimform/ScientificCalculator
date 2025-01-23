let memory = 0;
let currOpr = null;
let prevVal = '';
 

const display = document.getElementById('display');

function updateDisplay() {
    if (currOpr) {
        display.value = `${prevVal} ${currOpr} ${currVal}`;
    } else {
        display.value = currVal || prevVal || '0';
    }
}

function appendValue(value){
    if (value === '.' && currVal.includes('.')) return;
    currVal += value;
    updateDisplay();
}

function clearValue(){
    currVal='';
    prevVal='';
    currOpr=null;
    updateDisplay();
}

function backspace() {
    if (currVal!=='') {
        currVal = currVal.slice(0,-1);
    }
    else if(currOpr!==null){
        currOpr=null;
        currVal=prevVal;
        prevVal='';
    }
    updateDisplay();
}

function setOpr(opr) {
    if(currVal==='' && prevVal==='') return;
    if (prevVal !=='' && currVal!=='') {
        calcRes();
    }

    prevVal = prevVal || currVal;
    currVal='';
    currOpr=opr;
    updateDisplay();
}


function evaluate(){
    if(currVal==='' || prevVal==='' || !currOpr){
        return;
    }
    calcRes();
    currOpr='';
    updateDisplay();
}

function square(){
    if(currVal===''){
        return;
    }
    const num1 = parseFloat(currVal);
    let output;
    output= num1*num1;
    currVal=output.toString();
    updateDisplay();
}

function inverse(){
    if(currVal===''){
        return;
    }
    const num1 = parseFloat(currVal);
    let output;
    output= 1/num1;
    currVal=output.toString();
    updateDisplay();
}


function setOperator(opr) {
    if (currVal === '' && prevVal === '') return; 
    if (prevVal !== '' && currVal !== '') {
        calculateResult();
    }
    prevVal = currVal || prevVal; 
    currVal = ''; 
    currOpr = opr; 
    updateDisplay();
}

function calcRes() {
    const num1 = parseFloat(prevVal);
    const num2 = parseFloat(currVal);
    let output;

    switch(currOpr){
        case '+':
            output=num1+num2;
            break;
        case '-':
            output=num1-num2;
            break;
        case '*':
            output=num1*num2;
            break;
        case '/':
            output= num2 === 0 ? 'Infinity' : num1 / num2;
            break;
        case '%':
            output=num1%num2;
            break;
    }
    prevVal = output.toString();
    currVal = '';
}

function changeSign() {
    if(currVal!==''){
        currVal=(parseFloat(currVal)*(-1)).toString();
    }else if(prevVal!=='' & currOpr===null){
        prevVal=(parseFloat(prevVal)*(-1)).toString()
    }
    updateDisplay();
}

function mS(){
    if (currVal==='') return;
    memory=parseFloat(currVal);
}

function mAdd(){
    if (currVal==='') return;
    memory+=parseFloat(currVal);
}

function mSub() {
    if (currVal==='') return;
    memory-=parseFloat(currVal);
}

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
document.getElementById('btnEqual').addEventListener('click', evaluate);
document.getElementById('btnPM').addEventListener('click',changeSign)


// Memory

document.getElementById('btnMS').addEventListener('click', mS);
document.getElementById('btnMAdd').addEventListener('click', mAdd);
document.getElementById('btnMSub').addEventListener('click', mSub);


// console.log("Hello");

// function alt() {
//     alert("Calc");
// }
  

// let text="Hii";
// document.getElementById("trypara").innerHTML = text;

// function changecontent() {
//     document.getElementById("trypara").innerHTML = "New";
// }