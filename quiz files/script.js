const colorChanger = document.querySelector(".dark-mode-btn");
const prevButton = document.querySelector(".prev-question");
const nextButton = document.querySelector(".next-question");
const checkAnswers = document.querySelector(".check-answers");
let counterElement = document.querySelector(".counter");
let checkboxVal = 0;
let counter = 0;
let correctAnswers = 0;

const quizDetails = [
  {
    question: "q1",
    answers: ["a1", "a2", "a3"],
    correct: "a2",
    type: "radio",
  },
  {
    question: "q2",
    answers: ["b1", "b2", "b3"],
    correct: "b2",
    type: "radio",
  },
  {
    question: "q3",
    answers: ["c1", "c2", "c3"],
    correct: "c2",
    type: "radio",
  },
  {
    question: "q4",
    answers: ["d1", "d2", "d3"],
    correct: "d2",
    type: "radio",
  },
  {
    question: "q5",
    answers: ["e1", "e2", "e3"],
    correct: "e2",
    type: "radio",
  },
  {
    question: "qc10",
    answers: ["qca1", "qca2", "qca3"],
    correct: ["qca1", "qca2"],
    type: "checkbox",
  },
  {
    question: "q6",
    answers: ["f1", "f2", "f3"],
    correct: "f2",
    type: "radio",
  },
  {
    question: "q7",
    answers: ["g1", "g2", "g3"],
    correct: "g2",
    type: "radio",
  },
  {
    question: "q8",
    answers: ["h1", "h2", "h3"],
    correct: "h2",
    type: "radio",
  },
  {
    question: "q9",
    answers: ["j1", "j2", "j3"],
    correct: "j2",
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
          console.log(items, quizDetails[counter].correct[index]);
          checkboxVal++;
        } else {
          console.log(items, quizDetails[counter].correct[index]);
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
    console.log(userAnswer, quizDetails[counter].correct);

    console.log("checkbox");
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
  console.log(correctAnswers);
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
        correctAnswers + "rätt"),
      showGrade()
    );
  }
  showGrade();
  document.querySelector(".correct-ammount").innerHTML =
    correctAnswers + "rätt";
  console.log(correctAnswers);
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
}

updateQuiz();
