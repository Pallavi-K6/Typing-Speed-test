// ===============================
// TYPING TEXT
// ===============================

const texts = {

    easy: `
Typing is an important computer skill that becomes better with regular practice.
Learning to type quickly can save time when writing emails, documents, assignments,
reports, and messages. Good typing is not only about speed. Accuracy is also very
important. When you practice, try to keep your hands in a comfortable position and
look at the screen instead of looking at the keyboard. Start slowly and focus on
typing every word correctly. As you become comfortable, your speed will naturally
increase. Regular practice for a few minutes every day can make a big difference.
Do not worry if you make mistakes in the beginning. Learn from those mistakes and
continue practicing. A calm and steady typing rhythm is better than rushing through
the text. With patience and consistent practice, typing can become an easy and
natural part of your daily computer work.
`,

    medium: `
Modern computers are used for communication, education, business, programming,
research, and many other activities. Students regularly use computers to prepare
assignments, create presentations, search for information, and communicate with
teachers and classmates. Professionals use computers to prepare reports, manage
data, write emails, attend meetings, and complete important business tasks. Good
typing skills can make many of these activities faster and more comfortable.
However, speed should not be more important than accuracy. A small typing mistake
can sometimes change the meaning of a sentence or create incorrect information.
Therefore, effective typing requires concentration, correct finger movement, and
regular practice. Try to maintain a steady speed while paying attention to every
word and punctuation mark. Over time, your fingers will become familiar with common
patterns, and typing will require less conscious effort.
`,

    hard: `
Software development, scientific research, engineering, and data analysis often
require people to work with large amounts of detailed information. Developers may
write source code, read technical documentation, examine error messages, configure
software environments, and communicate technical decisions through written
instructions. Data professionals may work with numerical values, percentages,
dates, identifiers, formulas, and structured records. In these situations, even a
small typing error can produce an incorrect result or make information difficult
to understand. Advanced typing practice should therefore include unfamiliar words,
long sentences, punctuation, numbers, and technical vocabulary. The objective is
not simply to type as fast as possible. A reliable typist should maintain a steady
rhythm while reading several words ahead and carefully entering the required text.
When a difficult word appears, remain calm and continue typing rather than losing
your rhythm. After completing a practice session, examine the mistakes you made
and identify the patterns that caused them. Consistent practice with challenging
material can gradually improve both speed and accuracy.
`

};


// ===============================
// VARIABLES
// ===============================

let selectedTime = 30;

let selectedLevel = "easy";

let timeLeft = 30;

let timer;

let testStarted = false;

let currentText = "";


// ===============================
// HTML ELEMENTS
// ===============================

const timeDisplay = document.getElementById("time");

const wpmDisplay = document.getElementById("wpm");

const accuracyDisplay = document.getElementById("accuracy");

const mistakesDisplay = document.getElementById("mistakes");

const textDisplay = document.getElementById("textDisplay");

const typingArea = document.getElementById("typingArea");

const startButton = document.getElementById("startBtn");

const result = document.getElementById("result");


// ===============================
// SET TIME
// ===============================

function setTime(seconds, button) {

    if (testStarted) {
        return;
    }

    selectedTime = seconds;

    timeLeft = seconds;

    timeDisplay.textContent = seconds;

    document.querySelectorAll(".time-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    resetTest();
}


// ===============================
// SET LEVEL
// ===============================

function setLevel(level, button) {

    if (testStarted) {
        return;
    }

    selectedLevel = level;

    document.querySelectorAll(".level-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    resetTest();
}


// ===============================
// DISPLAY TEXT
// ===============================

function displayText() {

    currentText = texts[selectedLevel].trim();

    textDisplay.innerHTML = "";

    for (let i = 0; i < currentText.length; i++) {

        const span = document.createElement("span");

        span.textContent = currentText[i];

        textDisplay.appendChild(span);
    }
}


// ===============================
// START TEST
// ===============================

function startTest() {

    if (testStarted) {
        return;
    }

    testStarted = true;

    timeLeft = selectedTime;

    timeDisplay.textContent = timeLeft;

    typingArea.disabled = false;

    typingArea.value = "";

    typingArea.focus();

    result.classList.add("hidden");

    startButton.textContent = "Test Running";

    timer = setInterval(function() {

        timeLeft--;

        timeDisplay.textContent = timeLeft;

        calculateResults();

        if (timeLeft <= 0) {

            finishTest();

        }

    }, 1000);
}


// ===============================
// TYPING EVENT
// ===============================

typingArea.addEventListener("input", function() {

    if (!testStarted) {
        return;
    }

    const typedText = typingArea.value;

    const characters = textDisplay.querySelectorAll("span");

    for (let i = 0; i < characters.length; i++) {

        characters[i].classList.remove("correct");
        characters[i].classList.remove("wrong");

        if (i < typedText.length) {

            if (typedText[i] === currentText[i]) {

                characters[i].classList.add("correct");

            } else {

                characters[i].classList.add("wrong");

            }
        }
    }

    calculateResults();

    // Finish if complete text is typed

    if (typedText.length >= currentText.length) {

        finishTest();
    }

});


// ===============================
// CALCULATE RESULTS
// ===============================

function calculateResults() {

    const typedText = typingArea.value;

    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === currentText[i]) {

            correctCharacters++;
        }
    }


    // Calculate elapsed time

    const elapsedTime = selectedTime - timeLeft;

    const minutes = elapsedTime / 60;


    let wpm = 0;

    if (minutes > 0) {

        wpm = Math.round(
            (correctCharacters / 5) / minutes
        );
    }


    // Accuracy

    let accuracy = 100;

    if (typedText.length > 0) {

        accuracy = Math.round(
            (correctCharacters / typedText.length) * 100
        );
    }


    // Mistaken words

    const originalWords = currentText.split(/\s+/);

    const typedWords = typedText.trim()
        ? typedText.trim().split(/\s+/)
        : [];


    let mistakenWords = 0;


    for (let i = 0; i < typedWords.length; i++) {

        if (typedWords[i] !== originalWords[i]) {

            mistakenWords++;
        }
    }


    // Display

    wpmDisplay.textContent = wpm;

    accuracyDisplay.textContent = accuracy + "%";

    mistakesDisplay.textContent = mistakenWords;
}


// ===============================
// FINISH TEST
// ===============================

function finishTest() {

    clearInterval(timer);

    testStarted = false;

    typingArea.disabled = true;

    startButton.textContent = "Start Test";

    calculateResults();


    // Get final values

    const finalWpm = wpmDisplay.textContent;

    const finalAccuracy = accuracyDisplay.textContent;

    const finalMistakes = mistakesDisplay.textContent;


    document.getElementById("finalWpm").textContent = finalWpm;

    document.getElementById("finalAccuracy").textContent = finalAccuracy;

    document.getElementById("finalMistakes").textContent = finalMistakes;


    result.classList.remove("hidden");
}


// ===============================
// RESET TEST
// ===============================

function resetTest() {

    clearInterval(timer);

    testStarted = false;

    timeLeft = selectedTime;

    timeDisplay.textContent = selectedTime;

    wpmDisplay.textContent = "0";

    accuracyDisplay.textContent = "100%";

    mistakesDisplay.textContent = "0";

    typingArea.value = "";

    typingArea.disabled = true;

    startButton.textContent = "Start Test";

    result.classList.add("hidden");

    displayText();
}


// ===============================
// INITIAL SETUP
// ===============================

resetTest();
