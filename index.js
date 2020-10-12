var firstOperand = 0;
var secondOperand = 0;
var answer = 0;
var score = 0;
var correctChoiceNumber = 7;
var correctChoice = "";
var isSuccess;
var successPoint = 10;
var failurePoint = 2;
var remainingChoices = [];

var btnRed = "#FF3C3C";
var btnGreen = "#BEFF3C";

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
playerScoreTxt = document.getElementById("playerScore");
againBtnContainer = document.getElementById("againBtnContainer");
infoTxt = document.getElementById("info");
choice1 = document.getElementById("answer-0");
choice2 = document.getElementById("answer-1");
choice3 = document.getElementById("answer-2");
choice4 = document.getElementById("answer-3");
choice5 = document.getElementById("answer-4");
choice6 = document.getElementById("answer-5");

var choices = [ choice1, choice2, choice3, choice4, choice5, choice6 ];
var answers = [];

NewGame();

function NewOperation() {
    answers = [];
    isSuccess = false;
    operation = operations[ Math.floor(Math.random() * 4) + 1 ];
    choices.forEach(element => {
        element.parentNode.setAttribute("style", "background-color:aliceblue");
    });
    SetOperands();
    SetTexts();
    SetChoices();
    ResetRemainingChoices();
    SetRemainingChoices();
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
            secondOperand = Math.floor(Math.random() * 20);
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
    var randomNumber = Math.floor(Math.random() * 6) + 2;
    answers.push(answer);
    for (i = 0; i < 5; i++) {
        var generatedAnswer = i % 2 == 0 && randomNumber % 2 == 0 ? answer + randomNumber * i + 1 : Math.abs(answer - randomNumber * i + 1);
        answers.push(generatedAnswer);
    }
}

function SetChoices() {
    GenerateAnswers();
    nums = [ 0, 1, 2, 3, 4, 5 ];
    var number = nums.splice(Math.floor(Math.random() * 6), 1);
    correctChoiceNumber = number;
    correctChoice = "answer-" + number;
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
        console.log("doğru");
        SetDivColor(div, btnGreen);
        if (!isSuccess) {
            isSuccess = true;
            score += successPoint;
            setTimeout(NewOperation, 1000);
        }
    }
    else {
        if (!isSuccess) {
            if (remainingChoices.includes(div.firstElementChild.id)) {
                score -= failurePoint;
                index = remainingChoices.indexOf(div.firstElementChild.id);
                remainingChoices.splice(index, 1);
                SetDivColor(div, btnRed);
                if (remainingChoices.length < 2) {
                    GameOver();
                }
            }
        }
    }
    UpdateScore();
}

function ChangeBackgroundColor() {
    let color = colors[ Math.floor(Math.random() * 15) ];
    flashCard.setAttribute("style", "background-color:" + color + ";")
}

function SetRemainingChoices() {
    choices.forEach(element => {
        remainingChoices.push(element.id);
    });
}

function ResetRemainingChoices() {
    remainingChoices = [];
}

function UpdateScore() {
    playerScoreTxt.innerHTML = score;
}

function GameOver() {
    infoTxt.innerHTML = "Game Over";
    CreateAgainButton();
}

function NewGame() {
    againBtnContainer.innerHTML = "";
    infoTxt.innerHTML = "Score";
    UpdateScore();
    NewOperation();

}

function CreateAgainButton() {
    var againBtn = document.createElement("button");
    againBtn.setAttribute("class", "btn btn-warning again-btn");
    againBtn.setAttribute("onclick", "NewGame()");
    againBtn.innerHTML = "Play Again";
    againBtnContainer.appendChild(againBtn);
}

function SetDivColor(div, color) {
    div.setAttribute("style", "background-color:" + color + ";");
}