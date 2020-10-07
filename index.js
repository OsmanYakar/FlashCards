var firstOperand = 0;
var secondOperand = 0;
var answer = 0;
var operations = {
    1: '+',
    2: '-',
    3: 'x',
    4: '÷',
}

let operation = operations[ Math.floor(Math.random() * 4) + 1 ];

firstOperandTxt = document.getElementById("firstOperand");
secondOperandTxt = document.getElementById("secondOperand");
operatorTxt = document.getElementById("operator");
answer1 = document.getElementById("answer-1");
answer2 = document.getElementById("answer-2");
answer3 = document.getElementById("answer-3");
answer4 = document.getElementById("answer-4");
answer5 = document.getElementById("answer-5");
answer6 = document.getElementById("answer-6");

SetOperands();

function SetOperands() {
    switch (operation) {
        case operations[ 1 ]:
            firstOperand = Math.floor(Math.random() * 100);
            secondOperand = Math.floor(Math.random() * 100);
            answer = firstOperand + secondOperand;
            break;
        case operations[ 2 ]:
            secondOperand = Math.floor(Math.random() * 100);
            firstOperand = secondOperand + Math.floor(Math.random() * 100);
            answer = firstOperand - secondOperand;
            break;
        case operations[ 3 ]:
            firstOperand = Math.floor(Math.random() * 100);
            secondOperand = Math.floor(Math.random() * 100);
            answer = firstOperand * secondOperand;
            break;
        case operations[ 4 ]:
            secondOperand = Math.floor(Math.random() * 30);
            firstOperand = secondOperand * Math.floor(Math.random() * 50);
            answer = firstOperand / secondOperand;
            break;
        default:
            break;
    }
    SetTexts();
}

function SetTexts() {
    firstOperandTxt.innerHTML = firstOperand;
    secondOperandTxt.innerHTML = secondOperand;
    operatorTxt.innerHTML = operation;
    answer1.innerHTML = answer;
}