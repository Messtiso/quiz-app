// -------------------------
// Quiz Data
// -------------------------

let questions = [];

// -------------------------
// DOM Elements
// -------------------------

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");

// -------------------------
// Quiz State
// -------------------------

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// -------------------------
// Quiz Flow
// -------------------------

const loadQuestions = async () => {
    const response = await fetch("questions.json");
    questions = await response.json();
}

const startQuiz = async () => {
    currentQuestionIndex = 0;
    score = 0;

    if (questions.length === 0) {
        await loadQuestions();
    }
    
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();

    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = currentQuestion.question;
    progressElement.innerHTML = `${questionNo} / ${shuffledQuestions.length}`;

    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
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

    const percentage = (score / shuffledQuestions.length) * 100;

    let message = "";

    if(percentage <= 25) {
        message = "Keep practising!";
    } else if(percentage <= 50) {
        message = "Not bad, but you can do better.";
    } else if(percentage <= 75) {
        message = "Good job!";
    } else {
        message = "Excellent work!";
    }

    questionElement.innerHTML = `You scored ${score} out of ${shuffledQuestions.length}! <br> ${message}`;
    progressElement.innerHTML = "";

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

nextButton.addEventListener("click", () => {
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