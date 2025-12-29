// ==================== Quiz Data ====================
const quizQuestions = [
  {
    question: "What's my favorite flower?",
    options: ["Rose", "Sunflower", "Lily", "Daisy"],
    correctAnswer: 0, // Change this to match your answer
  },
  {
    question: "Where did we first meet?",
    options: ["Coffee Shop", "Park", "College", "Work"],
    correctAnswer: 0, // Change this to match your answer
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Biryani", "Pasta"],
    correctAnswer: 0, // Change this to match your answer
  },
  {
    question: "What's my favorite movie genre?",
    options: ["Romance", "Action", "Comedy", "Drama"],
    correctAnswer: 0, // Change this to match your answer
  },
  {
    question: "What do you love most about me?",
    options: [
      "Your Smile",
      "Your Kindness",
      "Your Laugh",
      "Everything About You",
    ],
    correctAnswer: 3, // "Everything About You" is the best answer
  },
];

let currentQuestion = 0;
let score = 0;

// ==================== Quiz Functions ====================
function checkAnswer(button, answerIndex) {
  const correct = quizQuestions[currentQuestion].correctAnswer === answerIndex;
  const feedback = button.parentElement.nextElementSibling;
  const allButtons = button.parentElement.querySelectorAll(".option-btn");

  // Disable all buttons
  allButtons.forEach((btn) => (btn.disabled = true));

  if (correct) {
    button.classList.add("correct");
    feedback.classList.add("show");
    feedback.textContent = "✓ Correct! I love that about you too! 💕";
    score++;

    // Show confetti
    showConfetti();

    // Move to next question
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  } else {
    button.classList.add("incorrect");
    feedback.classList.add("show");
    feedback.textContent = "✗ Not quite, but close! 😊 Try the next one!";

    setTimeout(() => {
      nextQuestion();
    }, 2500);
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    showResults();
  }
}

function showQuestion(index) {
  const cards = document.querySelectorAll(".quiz-card");
  cards.forEach((card) => card.classList.add("hidden"));
  cards[index].classList.remove("hidden");

  gsap.from(cards[index], {
    opacity: 0,
    y: 20,
    duration: 0.5,
  });
}

function showResults() {
  const quizCards = document.querySelectorAll(".quiz-card");
  const resultCard = document.querySelector(".quiz-result");

  quizCards.forEach((card) => card.classList.add("hidden"));
  resultCard.classList.remove("hidden");

  document.getElementById("quizScore").textContent = score;

  let resultMessage = "";
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage = `Perfect score! You know me as well as I know myself! 💕💕💕 I love you so much!`;
  } else if (percentage >= 80) {
    resultMessage = `Amazing! You really do know me well! 💕 I'm so lucky to have you!`;
  } else if (percentage >= 60) {
    resultMessage = `Good job! You know me pretty well! 💕 Let's make more memories together!`;
  } else if (percentage >= 40) {
    resultMessage = `Not bad! Maybe we need to talk more? 😊 I'd love to tell you everything about me!`;
  } else {
    resultMessage = `That's okay! Let's go on more dates so you can learn all my secrets! 😘`;
  }

  document.querySelector(".result-message").innerHTML = resultMessage;

  gsap.from(resultCard, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: "elastic.out",
  });
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;

  const cards = document.querySelectorAll(".quiz-card");
  const resultCard = document.querySelector(".quiz-result");

  resultCard.classList.add("hidden");
  cards.forEach((card) => {
    card.classList.add("hidden");
    const buttons = card.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.classList.remove("correct", "incorrect");
      btn.disabled = false;
    });
    const feedback = card.querySelector(".quiz-feedback");
    feedback.classList.remove("show");
    feedback.textContent = "";
  });

  showQuestion(0);
}

// ==================== Confetti Effect ====================
function showConfetti() {
  const confettiPieces = ["🎉", "✨", "💕", "⭐", "🎊"];
  const container = document.querySelector(".quiz-container");

  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement("div");
    confetti.textContent =
      confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
    confetti.style.cssText = `
            position: fixed;
            font-size: 2rem;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight / 2}px;
            pointer-events: none;
            z-index: 100;
        `;

    document.body.appendChild(confetti);

    gsap.to(confetti, {
      x: (Math.random() - 0.5) * 200,
      y: window.innerHeight,
      opacity: 0,
      duration: 2,
      ease: "power2.in",
      onComplete: () => confetti.remove(),
    });
  }
}

// Initialize quiz on page load
document.addEventListener("DOMContentLoaded", () => {
  showQuestion(0);
});
