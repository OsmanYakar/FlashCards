var firstOperand = 0;
var secondOperand = 0;
var answer = 0;
var correctChoiceNumber = 7;
var correctChoice = "";
var isSuccess;
var operations = {
    1: '+',
    2: '-',
    3: 'x',
    4: '÷',
}
var colors = {
    1: '#ff77aa',
    2: '#aaff77',
    3: '#77aaff',
    4: '#ba0c0b',
    5: '#604896',
    6: '#91d78d',
    7: '#c2d476',
    8: '#c07bb7',
    9: '#dad743',
    10: '#db8aae',
    11: '#30adf2',
    12: '#f382d6',
    13: '#bb598e',
    14: '#9de7a8',
    15: '#476ea9'
}

operation = operations[ 0 ];

flashCard = document.getElementById("flashCard");
firstOperandTxt = document.getElementById("firstOperand");
secondOperandTxt = document.getElementById("secondOperand");
operatorTxt = document.getElementById("operator");
choice1 = document.getElementById("answer-0");
choice2 = document.getElementById("answer-1");
choice3 = document.getElementById("answer-2");
choice4 = document.getElementById("answer-3");
choice5 = document.getElementById("answer-4");
choice6 = document.getElementById("answer-5");

var choices = [ choice1, choice2, choice3, choice4, choice5, choice6 ]
var answers = [];

NewOperation();

function NewOperation() {
    operation = operations[ Math.floor(Math.random() * 4) + 1 ];
    isSuccess = false;
    choices.forEach(element => {
        element.parentNode.setAttribute("style", "background-color:aliceblue");
    });
    SetOperands();
    SetTexts();
    SetChoices();
}

function SetOperands() {
    ChangeBackgroundColor();
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
            if (secondOperand > firstOperand) {
                var temp = firstOperand;
                firstOperand = secondOperand;
                secondOperand = temp;
            }
            answer = firstOperand * secondOperand;
            break;
        case operations[ 4 ]:
            secondOperand = Math.floor(Math.random() * 30);
            secondOperand = secondOperand == 0 ? secondOperand + Math.floor(Math.random() * 10) : secondOperand;
            firstOperand = secondOperand * Math.floor(Math.random() * 50);
            answer = firstOperand / secondOperand;
            break;
        default:
            break;
    }
}

function SetTexts() {
    firstOperandTxt.innerHTML = firstOperand;
    secondOperandTxt.innerHTML = secondOperand;
    operatorTxt.innerHTML = operation;
}

function GenerateAnswers() {
    var randomNumber = Math.floor(Math.random() * 10 + 1);
    answers.push(answer);
    for (i = 0; i < 5; i++) {
        var generatedAnswer = i % 2 == 0 ? answer + randomNumber * i + 2 : Math.abs(answer - randomNumber * i);
        answers.push(generatedAnswer);
    }
}

function SetChoices() {
    GenerateAnswers();
    nums = [ 0, 1, 2, 3, 4, 5 ];
    var number = nums.splice(Math.floor(Math.random() * 6), 1);
    correctChoiceNumber = number;
    correctChoice = "answer-" + number;
    console.log(correctChoice);
    choice = choices[ number ];
    choice.innerHTML = answer;
    for (i = 5; i > 0; i--) {
        number = nums.splice(Math.floor(Math.random() * i), 1);
        answer = answers[ i ];
        choice = choices[ number ];
        choice.innerHTML = answer;
    }
}

function SelectAnswer(div) {
    if (choices[ correctChoiceNumber ].id == div.firstElementChild.id) {
        if (!isSuccess) {
            choices.forEach(element => {
                element.innerHTML = "↺";
            });
            div.firstElementChild.innerHTML = "✔"
        }
        isSuccess = true;
    }
    else {
        if (!isSuccess)
            div.setAttribute("style", "background-color:#B31004");
        else {
            NewOperation();
        }
    }
}

function ChangeBackgroundColor() {
    let color = colors[ Math.floor(Math.random() * 15) ];
    flashCard.setAttribute("style", "background-color:" + color + ";")
}

