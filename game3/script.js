document.addEventListener("DOMContentLoaded", function() {


const body = document.querySelector("body");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const answerGrid = document.getElementById("answer-buttons");
let answerButtons = document.getElementById("answer-buttons").children;
let nextQuestion = document.getElementById("question");

let questions = JSON.parse(localStorage.getItem("myData"));
//Not sure why but the answer column must be "mapped out" before you can use it in this program
let csv2 = Array.from(questions);
let okWrongAnswers = csv2.map(function (key) {
  return key.Pinyin;
});

const shuffle = (questions) => questions.sort(() => Math.random() - 0.5);
let i;

startButton.addEventListener("click", startGame);

function startGame() {
  clearEverything();
  shuffle(questions);
  console.log("Started");
  i = 0;

  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}
// this filters the correct answer out of the list of wrong answers
function setNextQuestion() {
  let notThatOne = questions[i].Pinyin;
  let newWrongAnswers = okWrongAnswers.filter((item) => item !== notThatOne);

  //this displays the question
  nextQuestion.innerText = questions[i].Hanzi;
  //this keeps randomizes which button the answers appear in
  shuffle(newWrongAnswers);

  //This fills in the answer boxes w/ wrong answers
  for (let j in answerButtons) {
    answerButtons[j].innerText = newWrongAnswers[j];
  }
  /*This replaces one of the wrong answers w/ the right one. It works better for this to come after the wrong answers are picked.*/
  answerButtons[Math.floor(Math.random() * answerButtons.length)].innerText =
    questions[i].Pinyin;

  //How JavaScript Event Delegation Works
  answerGrid.addEventListener("click", function (e) {
    if (e.target.innerText === questions[i].Pinyin) {
      console.log("good");
      e.target.classList.add("correct");
      body.classList.add("correct");
    } else {
      console.log("nope");
      e.target.classList.add("wrong");
      body.classList.add("wrong");
    }
    //This prevents multiple submissions w/ one click. Not sure why that happens.
    e.stopImmediatePropagation();

    nextButton.classList.remove("hide");
  });
}

nextButton.addEventListener("click", () => {
  if (questions.length > i + 1) {
    i++;
    clearEverything();
    setNextQuestion();
  } else {
    startButton.classList.remove("hide");
    questionContainerElement.classList.add("hide");
    startButton.innerText = "Restart";
    body.classList.remove("wrong", "correct");
  }
  nextButton.classList.add("hide");
});

function clearEverything() {
  //unlike body, answerButtons is an array and has be reset w/ a loop
  for (let c of answerButtons) {
    c.classList.remove("correct", "wrong");
  }
  body.classList.remove("wrong", "correct");
}
});