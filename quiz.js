// load quiz data from JSON file
fetch ('quizData.json').then (response => response.json ()).then (data => {
  // get reference to quiz container element
  const quizContainer = document.getElementById ('quiz-container');

  // loop through each question in the quiz data
  data.questions.forEach ((question, index) => {
    // create a new question container element
    const questionContainer = document.createElement ('div');

    // add question text to the question container
    const questionText = document.createElement ('p');
    questionText.innerText = `${index + 1}. ${question.question}`;
    questionContainer.appendChild (questionText);

    // loop through each option for the current question
    question.options.forEach ((option, optionIndex) => {
      // create a new radio button for the current option
      const optionElement = document.createElement ('input');
      optionElement.setAttribute ('type', 'radio');
      optionElement.setAttribute ('name', `question${index}`);
      optionElement.setAttribute ('value', option);
      questionContainer.appendChild (optionElement);

      // add option text to the radio button
      const optionLabel = document.createElement ('label');
      optionLabel.innerText = option;
      questionContainer.appendChild (optionLabel);

      // add a line break between each option
      const lineBreak = document.createElement ('br');
      questionContainer.appendChild (lineBreak);
    });

    // add the question container to the quiz container
    quizContainer.appendChild (questionContainer);
  });
});

function displayQuestion (question) {
  // display the question and options
  // ...

  // add event listener for the submit button
  submitBtn.addEventListener ('click', function () {
    // get the selected option
    const selectedOption = document.querySelector (
      'input[name="option"]:checked'
    );

    // check if an option was selected
    if (selectedOption) {
      // check if the selected option is the correct answer
      if (selectedOption.value === question.answer) {
        // increment the score
        score++;
      }

      // move on to the next question
      currentQuestion++;

      // display the next question
      displayQuestion (questions[currentQuestion]);
    } else {
      // display an error message
      errorMsg.textContent = 'Please select an option.';
    }
  });
}

function displayScore () {
  // display the final score
  scoreContainer.textContent = `Your score: ${score} out of ${questions.length}`;

  // show the restart button
  restartBtn.style.display = 'block';
}

function validateAnswer () {
  // display the first question
  displayQuestion (questions[currentQuestion]);

  // add event listener for the restart button
  restartBtn.addEventListener ('click', function () {
    // reset the score and current question
    score = 0;
    currentQuestion = 0;

    // hide the restart button
    restartBtn.style.display = 'none';

    // display the first question again
    displayQuestion (questions[currentQuestion]);
  });

  // add event listener for the submit button on the last question
  submitBtn.addEventListener ('click', function () {
    // get the selected option
    const selectedOption = document.querySelector (
      'input[name="option"]:checked'
    );

    // check if an option was selected
    if (selectedOption) {
      // check if the selected option is the correct answer
      if (selectedOption.value === questions[currentQuestion].answer) {
        // increment the score
        score++;
      }

      // display the final score
      displayScore ();
    } else {
      // display an error message
      errorMsg.textContent = 'Please select an option.';
    }
  });
}

// start the quiz
validateAnswer ();
