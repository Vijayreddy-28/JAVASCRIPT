// load questions from JSON
let questions = [];
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    startQuiz();
  })
  .catch((error) => console.error("Error loading JSON:", error));

const questionbtn = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

// start quiz
function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  showQuestion();
}

// show question
function showQuestion() {
  resetState();
  let currQuestion = questions[currQuestionIndex];
  let questionNum = currQuestionIndex + 1;

  questionbtn.innerHTML = questionNum + ". " + currQuestion.question;

  currQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbutton.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

// reset state
function resetState() {
  nextbtn.style.display = "none";
  answerbutton.innerHTML = "";
}

// select answer
function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct == "true";

  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }

  Array.from(answerbutton.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextbtn.style.display = "block";
}

// next question
function handleNextButton() {
  currQuestionIndex++;
  if (currQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// show score
function showScore() {
  resetState();
  questionbtn.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextbtn.innerHTML = "Play Again";
  nextbtn.style.display = "block";
}

// next button click
nextbtn.addEventListener("click", () => {
  if (currQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
