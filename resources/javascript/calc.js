let lhs = ''
let rhs = ''
let currOperation = null
let shouldResetScreen = false

//besondere knopfen
const numButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const pctButton = document.getElementById('pctBtn')
const expButton = document.getElementById('expBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currOperationScreen = document.getElementById('currOperationScreen')

// event listeners für funktionen
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)
pctButton.addEventListener('click', () => {
    const currentNumber = parseFloat(currOperationScreen.textContent);
    appendPercentage(currentNumber);
  });

numButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

/* funktionen. hab exponential definiert 
aber werde das später intergrieren w design*/

function appendPercentage(curr) {
    let mod = curr / 100;
    currOperationScreen.textContent = mod.toString();
  }

function appendNumber(number) {
  if (currOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currOperationScreen.textContent += number
}

function resetScreen() {
  currOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  lhs = ''
  rhs = ''
  currOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currOperationScreen.textContent === '')
    currOperationScreen.textContent = '0'
  if (currOperationScreen.textContent.includes('.')) return
  currOperationScreen.textContent += '.'
}

function deleteNumber() {
  currOperationScreen.textContent = currOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currOperation !== null) evaluate()
  lhs = currOperationScreen.textContent
  currOperation = operator
  lastOperationScreen.textContent = `${lhs} ${currOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currOperation === null || shouldResetScreen) return
  if (currOperation === '÷' && currOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  rhs = currOperationScreen.textContent
  currOperationScreen.textContent = roundResult(
    operate(currOperation, lhs, rhs)
  )
  lastOperationScreen.textContent = `${lhs} ${currOperation} ${rhs} =`
  currOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}


/*basic operationen*/ 
const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const power = function(a, b) {
    return Math.pow(a, b);
  };

const factorial = function(n) {
    if (n === 0) {
      return 1;
    }

    return n * factorial(n - 1);
};

const divide = function(a, b) {
    if (b === 0) {
        alert("You can't divide by 0!");
        return NaN;
    }
    return a / b;
}

// f. jahresobjekt im footer
const currentYearSpan = document.getElementById('currentYear');
currentYearSpan.textContent = new Date().getFullYear();


/* wird alles zusammenfassen 
und alle operationen ausführen wenn sie gefordert sind*/

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '×':
        return multiply(a, b);
      case '÷':
        return divide(a, b);
      default:
        return NaN;
    }
}