var questions = JSON.parse(localStorage.getItem("myData"));
// var questions = [
//   {
//     Hanzi: "吗",
//     English: "particle: calling for agreement or disagreement",
//     Pinyin: "mā"
//   },
//   { Hanzi: "好", English: "good; to be fond of", Pinyin: "hǎo, hào" },
//   { Hanzi: "你", English: "you", Pinyin: "nǐ" }
// ];
let Qcounter = 0;
let currentQuestion;
let availableQuestions = [];
let score = 0;

const SetavailableQuestions = () => {
  for (let i = 0; i < questions.length; i++) {
    availableQuestions.push(questions[i]);
  }
};

const newQuestions = () => {
  // generate random number
  let qIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = qIndex;
  document.getElementById("front").innerHTML = currentQuestion.Hanzi;
  document.getElementById("back").innerHTML = currentQuestion.English;
  //get position of random index in aray
  const index1 = availableQuestions.indexOf(qIndex);
  // remove the random question from availabe questions to prevent repitition
  availableQuestions.splice(index1, 1);
  Qcounter++;
};

// NEXT QUESTION

const next = () => {
  if (Qcounter === questions.length) {
    // score
    alert("Great job! Keep studying.");
    document.querySelector("#front").innerHTML = score + "/" + questions.length;
    document.querySelector("#back").innerHTML =
      (score / questions.length) * 100 + "%";

    //start over
    document.querySelector("#start-over").style.display = "inline-block";
    document.querySelector("#submit-button").style.display = "none";

    //document.querySelector("#card").style.display = "none";
    document.querySelector("#input").style.display = "none";
    document
      .querySelector("#start-over")
      .addEventListener("click", () => location.reload());
  } else {
    newQuestions();
  }
};

// RUN ON ENTER

const checkAnswer = () => {
  // get user input
  const input = document.querySelector("#input");
  const submit = document.querySelector("#submit-button");
  input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13 || e.code === "Enter") {
      var inpText = document.querySelector("#input").value;

      if (inpText.length < 1 || inpText === "" || inpText === " ") return null;

      //check user answer
      if (currentQuestion.Hanzi === inpText) {
        sound1.play();

        score++;
        next();
      } else {
        sound2.play();
        alert("Pinyin: " + currentQuestion.Pinyin);

        next();
      }

      // clear the input
      document.querySelector("#input").value = "";
    }
  });
  submit.addEventListener("click", () => {
    var inpText = document.querySelector("#input").value;

    if (inpText.length < 1 || inpText === "" || inpText === " ") return null;

    //check user answer
    if (currentQuestion.prompt === inpText) {
      sound1.play();

      score++;
      next();
    } else {
      sound2.play();
      alert("Pinyin: " + currentQuestion.Pinyin);

      next();
    }

    // clear the input
    document.querySelector("#input").value = "";
  });
};

window.onload = function (params) {
  SetavailableQuestions();
  newQuestions();
  checkAnswer();
};
var audio = document.getElementById("audio");

function playMusic() {
  return audio.paused ? audio.play() : audio.pause();
}
var sound1 = new Audio("/SoundClips/Water Drop.mp3"); // buffers automatically when created
var sound2 = new Audio("/SoundClips/Cricket.mp3"); // buffers automatically when created
