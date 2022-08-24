// determine the type of buttons
// const buttonEl = e.target;
// const action = buttonEl.dataset.action;

const display = document.getElementById("display");
display.textContent = `0`;
const buttons = document.querySelector(".buttons");
const calculator = document.querySelector(".calculator");

buttons.addEventListener("click", e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const prevKeyType = calculator.dataset.prevKeyType;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));


        if (!action) {
            console.log('It is a number');
            if (displayedNum === '0' || prevKeyType === 'operator' || prevKeyType === 'equal') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.prevKeyType = 'number';
        }

        if (
            action === 'addition' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') {

            console.log('It is an operator');

            const number1 = calculator.dataset.number1;
            const operator = calculator.dataset.operator;
            const number2 = displayedNum;

            if (number1 && operator && prevKeyType !== 'operator' && prevKeyType !== 'equal') {
                const calcuation = operation(number1, operator, number2);
                display.textContent = calcuation;
                calculator.dataset.number1 = calcuation;
            } else {
                calculator.dataset.number1 = displayedNum;
            }
            key.classList.add('is-depressed');
            calculator.dataset.number1 = displayedNum;
            calculator.dataset.prevKeyType = 'operator';
            calculator.dataset.operator = action;

            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        }
        if (action === 'clear') {
            console.log('It is a clear button');
            if (key.textContent === 'clear') {
                calculator.dataset.number1 = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.prevKeyType = '';
            } else {
                key.textContent = 'clear';
            }

            display.textContent = 0;
            calculator.dataset.prevKeyType = 'clear';

        }
        if (action === 'equal') {
            console.log('It is an equal button');
            let number1 = calculator.dataset.number1;
            const operator = calculator.dataset.operator;
            const number2 = displayedNum;

            if (number1) {
                if (prevKeyType === 'equal') {
                    number1 = displayedNum;
                    number2 = calculator.dataset.modValue;
                }
                display.textContent = operation(number1, operator, number2);
            }

            calculator.dataset.prevKeyType = 'equal';

        }
        if (action === 'decimal') {
            console.log('It is a dot button');
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (prevKeyType === 'operator' || prevKeyType === 'equal') {
                display.textContent = '0.';
            }

            calculator.dataset.prevKeyType = 'decimal';
        }
        if (action === 'backspace') {
            console.log('It is a back button');

            calculator.dataset.prevKeyType = 'backspace';
        }
    }

});
const operation = (number1, operator, number2) => {
    let result = " ";

    console.log(number1);
    console.log(operator);
    console.log(number2);
    if (operator === 'add') {
        result = parseFloat(number1) + parseFloat(number2);
    } else if (operator === 'subtract') {
        result = parseFloat(number1) - parseFloat(number2);
    } else if (operator === 'multiply') {
        result = parseFloat(number1) * parseFloat(number2);
    } else if (operator === 'divide') {
        result = (parseFloat(number1) / parseFloat(number2)).toFixed(5);
        // parseFloat(result).toFixed(5);
    }

    console.log(result);
    return result;
}


// Addition Operation
function add(x, y) {
    return x + y;
}
console.log(add(4, 5));

// Subtraction Operation
function sub(a, b) {
    return a - b;
}
console.log(sub(4, 5));

// Multiply Operation
function mul(c, d) {
    return c * d;
}
console.log(mul(4, 5));

// Division Operation
function div(z, w) {
    return z / w;
}
console.log(div(4, 2));



// Calculator
// function operate(operator, a, b) {
//     switch (operator) {
//         case "+":
//             add(a, b);
//             break;
//         case "-":
//             sub(a, b);
//             break;
//         case "*":
//             mul(a, b);
//             break;
//         case "/":
//             division(a, b);
//             break;
//     }
// }