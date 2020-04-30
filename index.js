let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function appendNumber(number) {
  if (previousOperand !== "" && currentOperand === "") {
    currentOperand = "";
  }
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(getOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = getOperation;
  previousOperand = currentOperand;
  updateDisplay();
  currentOperand = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
}

function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand;
}

function init() {
  clear();
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", (button) => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  clear();
  updateDisplay();
});

init();
