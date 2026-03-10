// -------------------------
// Quiz Data
// -------------------------

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false}, 
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antartica", correct: true}, 
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Artic", correct: false},
            { text: "Africa", correct: false}, 
        ]
    }
];

// -------------------------
// DOM Elements
// -------------------------

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// -------------------------
// Quiz State
// -------------------------

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// -------------------------
// Quiz Flow
// -------------------------

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    nextButton.innerHTML = "Next";
    showQuestion();
}
const showQuestion = () => {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `Question ${questionNo} / ${shuffledQuestions.length}<br>${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    })
}

// -------------------------
// Helper Functions
// -------------------------

const resetState = () => {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

const showScore = () => {
    resetState();

    const percentage = (score/shuffledQuestions.length) * 100;

    let message = "";

    if(percentage <= 25) {
        message = "Keep practising!";
    } else if(percentage <= 50) {
        message = "Not bad, but you can do better.";
    } else if(percentage <= 75) {
        message = " Good job!";
    } else {
        message = "Excellent work!";
    }
    questionElement.innerHTML = `You scored ${score} out of ${shuffledQuestions.length}! <br> ${message}`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < shuffledQuestions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// -------------------------
// Event Listeners
// -------------------------

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < shuffledQuestions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

// -------------------------
// App Start
// -------------------------

startQuiz();