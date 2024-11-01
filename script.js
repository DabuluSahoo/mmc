const quizData = [
    { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
];

// Variable to track the last selected radio button
let lastSelected = null;

// Start quiz if Enter key is pressed
function startQuizOnEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission
        startQuiz();
    }
}

function startQuiz() {
    const contestantName = document.getElementById("contestant-name").value;
    if (!contestantName) {
        alert("Please enter your name to start the quiz.");
        return;
    }
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("quiz-form").style.display = "block";
    loadQuiz();
}

function loadQuiz() {
    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = "";
    quizData.forEach((data, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        // Question text
        questionElement.innerHTML = `<h3>${index + 1}. ${data.question}</h3>`;

        // Options
        data.options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("options");
            optionElement.innerHTML = `
                <label>
                    <input type="radio" name="question${index}" value="${option}" onclick="toggleSelection(event)">
                    ${option}
                </label>
            `;
            questionElement.appendChild(optionElement);
        });

        questionsContainer.appendChild(questionElement);
    });
}

// Function to toggle the selection of an answer
function toggleSelection(event) {
    const selectedRadio = event.target;

    // If the same radio button is clicked again, deselect it
    if (lastSelected === selectedRadio) {
        selectedRadio.checked = false;  // Deselect the radio button
        lastSelected = null;  // Clear last selected
    } else {
        lastSelected = selectedRadio;  // Update last selected
    }
}

function submitQuiz() {
    let score = 0;
    const contestantName = document.getElementById("contestant-name").value;

    quizData.forEach((data, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === data.answer) {
            score++;
        }
    });

    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `${contestantName}, you scored ${score} out of ${quizData.length}`;
    resultContainer.style.display = "block";

    // Apply conditional styling based on score
    if (score === quizData.length) {
        resultContainer.className = "result excellent";
    } else if (score >= quizData.length / 2) {
        resultContainer.className = "result good";
    } else {
        resultContainer.className = "result poor";
    }

    // Save to localStorage
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    results.push({ name: contestantName, score: score });
    localStorage.setItem("quizResults", JSON.stringify(results));

    // Scroll to the result section
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}
