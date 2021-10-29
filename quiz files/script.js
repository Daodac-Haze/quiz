const colorChanger = document.querySelector(".dark-mode-btn");
const prevButton = document.querySelector(".prev-question");
const nextButton = document.querySelector(".next-question");
const checkAnswers = document.querySelector(".check-answers");
const redoQuiz = document.querySelector(".redo-quiz");
let counterElement = document.querySelector(".counter");
let checkboxVal = 0;
let counter = 0;
let correctAnswers = 0;

const quizDetails = [
  {
    question: "Hur stavas mitt namn? 🤔",
    answers: ["Hazim", "Hazem", "Hasim"],
    correct: "Hazem",
    type: "radio",
  },
  {
    question: "Hur lång är jag? 📏",
    answers: ["170cm", "173cm", "175cm"],
    correct: "173cm",
    type: "radio",
  },
  {
    question: "Vad brukar jag göra på fritiden? 🖥️",
    answers: ["Datorspel", "Sport", "Fiska"],
    correct: "Datorspel",
    type: "radio",
  },
  {
    question: "Hur många syskon har jag? 👪",
    answers: ["2st", "1st", "4st"],
    correct: "4st",
    type: "radio",
  },
  {
    question: "Vilken färg har mina skor? 👞",
    answers: ["Svart", "Vit", "Orange"],
    correct: "Vit",
    type: "radio",
  },
  {
    question: "Vilka är mina favorit frukter? 🍓🥝",
    answers: ["Vattenmelon", "Banan", "Appelsin"],
    correct: ["Vattenmelon", "Banan"],
    type: "checkbox",
    disclamer: "Detta är en flervalsfråga!",
  },
  {
    question: "Brukar jag äta frukost?",
    answers: ["Ja", "Nej", "Ibland"],
    correct: "Ibland",
    type: "radio",
  },
  {
    question: "Hur gammal är jag?",
    answers: ["23", "24", "21"],
    correct: "21",
    type: "radio",
  },
  {
    question: "Hur många språk kan jag?",
    answers: ["2st", "3st", "5st"],
    correct: "3st",
    type: "radio",
  },
  {
    question: "Vad är min favoritdryck?",
    answers: ["Nocco", "Pepsi", "Cola"],
    correct: "Nocco",
    type: "radio",
  },
];

let darkmode = false;

colorChanger.addEventListener("click", (event) => {
  toggleMode();
});

prevButton.addEventListener("click", (event) => {
  if (counter < 1) {
    return counter == 0;
  }
  if (correctAnswers < 1) {
    return correctAnswers == 0;
  }
  correctAnswers--;
  counter--;
  updateQuiz();
});

nextButton.addEventListener("click", (event) => {
  if (counter == 9) {
    return counter == 10;
  }
  if (quizDetails[counter].type == "checkbox") {
    var checkboxes = document.getElementsByName("quizAnswer");
    var userAnswer = [];
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      if (checkboxes[i].checked) {
        userAnswer.push(checkboxes[i].value);
      }
    }
    if (userAnswer.length < 2 || userAnswer.length > 2) {
      counter++;
      updateQuiz();
    } else {
      userAnswer.forEach(function callbackFn(items, index) {
        if (items === quizDetails[counter].correct[index]) {
          checkboxVal++;
        } else {
          checkboxVal--;
        }
      });
      if (checkboxVal == 2) {
        correctAnswers++;
        counter++;
        updateQuiz();
      } else {
        counter++;
        updateQuiz();
      }
    }
  } else {
    if (
      document.querySelector('input[name="quizAnswer"]:checked').value ===
      quizDetails[counter].correct
    ) {
      correctAnswers++;
      counter++;
      updateQuiz();
    } else {
      counter++;
      updateQuiz();
    }
    if (counter == 9) {
      return (
        nextButton.classList.toggle("hidden"),
        checkAnswers.classList.toggle("hidden")
      );
    }
  }
});

function updateQuiz() {
  if (counter > 9) {
    return (counterElement.innerHTML = counter + "/10");
  }
  counterElement.innerHTML = counter + 1 + "/10";

  document.querySelector(".quiz-details").innerHTML = "";
  document.querySelector(".quiz-answers-container").innerHTML = "";

  const quizContainer = document.querySelector(".quiz-details");
  const answerContainer = document.querySelector(".quiz-answers-container");
  const quizQuestion = quizDetails[counter];
  if (quizQuestion.type === "radio") {
    const currentQuizQuestion = `<div class="quiz-question">
    <h2 class="quiz-question-title">${quizQuestion.question}</h2>
  </div>`;
    quizContainer.insertAdjacentHTML("beforeend", currentQuizQuestion);

    const currentQuizAnswers = `<div class="quiz-answers-container">
        <input type="radio" id="optionOne" name="quizAnswer" value="${quizQuestion.answers[0]}" />
        <label for="optionOne">${quizQuestion.answers[0]}</label>
        <input type="radio" id="optionTwo" name="quizAnswer" value="${quizQuestion.answers[1]}" />
        <label for="optionTwo">${quizQuestion.answers[1]}</label>
        <input type="radio" id="optionThree" name="quizAnswer" value="${quizQuestion.answers[2]}" />
        <label for="optionThree">${quizQuestion.answers[2]}</label>
      </div>`;
    answerContainer.insertAdjacentHTML("beforeend", currentQuizAnswers);
  } else {
    const currentQuizQuestion = `<div class="quiz-question">
    <h2 class="quiz-question-title">${quizQuestion.question}</h2>
    <h3 class="quiz-question-disclamer">${quizQuestion.disclamer}</h3>
  </div>`;
    quizContainer.insertAdjacentHTML("beforeend", currentQuizQuestion);

    const currentQuizAnswers = `<div class="quiz-answers-container">
        <input type="checkbox" id="optionOne" name="quizAnswer" value="${quizQuestion.answers[0]}" />
        <label for="optionOne">${quizQuestion.answers[0]}</label>
        <input type="checkbox" id="optionTwo" name="quizAnswer" value="${quizQuestion.answers[1]}" />
        <label for="optionTwo">${quizQuestion.answers[1]}</label>
        <input type="checkbox" id="optionThree" name="quizAnswer" value="${quizQuestion.answers[2]}" />
        <label for="optionThree">${quizQuestion.answers[2]}</label>
      </div>`;
    answerContainer.insertAdjacentHTML("beforeend", currentQuizAnswers);
  }
}
checkAnswers.addEventListener("click", (event) => {
  calculateGrade();
});

function calculateGrade() {
  if (
    document.querySelector('input[name="quizAnswer"]:checked').value ===
    quizDetails[counter].correct
  ) {
    return (
      correctAnswers++,
      (document.querySelector(".correct-ammount").innerHTML =
        correctAnswers + " / 10 rätt"),
      showGrade()
    );
  }
  showGrade();
  document.querySelector(".correct-ammount").innerHTML =
    correctAnswers + " / 10 rätt";
}

function toggleMode() {
  document.querySelectorAll(".dark-mode-selector").forEach(function (item) {
    item.classList.toggle("dark-colors");
  });
  if (darkmode === true) {
    document.getElementById("imageSelector").src = "/images/moon.png";
  } else {
    document.getElementById("imageSelector").src = "/images/sun.png";
  }
  darkmode = !darkmode;
}

function showGrade() {
  document.querySelector(".quiz-container").classList.add("hidden");
  document.querySelector(".grade-on-quiz-container").classList.remove("hidden");
  if (correctAnswers < 5 && correctAnswers < 8) {
    document.querySelector(".correct-ammount").classList.add("red");
  } else if (correctAnswers >= 5 && correctAnswers < 7) {
    document.querySelector(".correct-ammount").classList.add("orange");
  } else if (correctAnswers >= 8) {
    document.querySelector(".correct-ammount").classList.add("green");
  }
}
redoQuiz.addEventListener("click", (event) => {
  resetQuiz();
});
function resetQuiz() {
  checkboxVal = 0;
  counter = 0;
  correctAnswers = 0;

  nextButton.classList.toggle("hidden"),
    checkAnswers.classList.toggle("hidden");
  updateQuiz();
  document.querySelector(".correct-ammount").classList.remove("green");
  document.querySelector(".correct-ammount").classList.remove("orange");
  document.querySelector(".correct-ammount").classList.remove("red");
  document.querySelector(".quiz-container").classList.remove("hidden");
  document.querySelector(".grade-on-quiz-container").classList.add("hidden");
}

updateQuiz();
