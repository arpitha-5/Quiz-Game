// DOM Elements
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const quizContainer = document.getElementById('quiz-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username-display');

// Quiz elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');

// Quiz game variables
let currentQuestionIndex = 0;
let score = 0;
let timerValue = 15;
let quizTimer;
let questions = [];
let isFetching = false;
let currentUser = null;
let selectedOption = null;
let isAnswerSelected = false;

// Simple user database (in a real app, use a backend)
const users = JSON.parse(localStorage.getItem('quizUsers')) || [];

// Toggle between login and signup forms
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginContainer.style.display = 'none';
  signupContainer.style.display = 'block';
  signupError.textContent = '';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupContainer.style.display = 'none';
  loginContainer.style.display = 'block';
  loginError.textContent = '';
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Simple validation
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    usernameDisplay.textContent = user.name;
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    fetchQuestions();
  } else {
    loginError.textContent = 'Invalid email or password';
  }
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  // Validation
  if (password !== confirm) {
    signupError.textContent = 'Passwords do not match';
    return;
  }

  if (users.some(u => u.email === email)) {
    signupError.textContent = 'Email already registered';
    return;
  }

  // Create new user
  const newUser = { name, email, password, highScore: 0 };
  users.push(newUser);
  localStorage.setItem('quizUsers', JSON.stringify(users));
  
  // Auto-login
  currentUser = newUser;
  usernameDisplay.textContent = newUser.name;
  signupContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  fetchQuestions();
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  quizContainer.style.display = 'none';
  loginContainer.style.display = 'block';
  resetQuiz();
});

// Reset quiz state
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(quizTimer);
  questions = [];
  questionElement.textContent = 'Loading...';
  optionsContainer.innerHTML = '';
  scoreElement.textContent = 'Score: 0';
  timerElement.textContent = 'Time Left: 15s';
  isAnswerSelected = false;
  selectedOption = null;
}

// Enhanced fetch with retry logic and fallback questions
async function fetchQuestions() {
  if (isFetching) return;
  isFetching = true;
  
  try {
    questionElement.innerHTML = "Loading questions<span class='spinner'></span>";
    
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (data.response_code !== 0) throw new Error('API response error');
    
    const newQuestions = data.results.map(item => ({
      question: item.question,
      options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
      correctAnswer: item.correct_answer
    }));
    
    questions = [...questions, ...newQuestions];
    
    if (questions.length > 0) {
      startQuiz();
    } else {
      fetchQuestions();
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    
    if (questions.length === 0) {
      questionElement.textContent = "Failed to load questions. Please try again later.";
      setTimeout(fetchQuestions, 5000);
    }
  } finally {
    isFetching = false;
  }
}

// Start the quiz
function startQuiz() {
  if (questions.length === 0) {
    fetchQuestions();
    return;
  }
  
  showQuestion();
  startTimer();
}

// Display the current question and options
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    fetchQuestions();
    return;
  }
  
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  
  optionsContainer.innerHTML = '';
  isAnswerSelected = false;
  selectedOption = null;
  
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option';
    button.textContent = option;
    button.onclick = () => selectAnswer(option, button);
    optionsContainer.appendChild(button);
  });
  
  scoreElement.textContent = `Your Score is: ${score}`;
}

// Handle answer selection
function selectAnswer(selectedOption, button) {
  if (isAnswerSelected) return;
  
  isAnswerSelected = true;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  
  // Disable all options
  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(opt => {
    opt.classList.add('disabled');
  });
  
  // Highlight selected option
  if (isCorrect) {
    button.classList.add('correct');
    score++;
    scoreElement.textContent = `Your Score is: ${score}`;
    
    // Update high score if needed
    if (currentUser && score > currentUser.highScore) {
      currentUser.highScore = score;
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex].highScore = score;
        localStorage.setItem('quizUsers', JSON.stringify(users));
      }
    }
  } else {
    button.classList.add('wrong');
    // Highlight correct answer
    allOptions.forEach(opt => {
      if (opt.textContent === currentQuestion.correctAnswer) {
        opt.classList.add('correct');
      }
    });
  }
  
  clearInterval(quizTimer);
  
  // Move to next question after a delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      startTimer();
    } else {
      fetchQuestions();
    }
  }, 1500);
}

// Start the timer for current question
function startTimer() {
  clearInterval(quizTimer);
  timerValue = 15;
  timerElement.textContent = `Time Left: ${timerValue}s`;
  
  quizTimer = setInterval(() => {
    timerValue--;
    timerElement.textContent = `Time Left: ${timerValue}s`;
    
    if (timerValue <= 0) {
      clearInterval(quizTimer);
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
      } else {
        fetchQuestions();
      }
    }
  }, 1000);
}

// Skip to next question
function skipQuestion() {
  clearInterval(quizTimer);
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    startTimer();
  } else {
    fetchQuestions();
  }
}

// Event listeners for quiz controls
nextBtn.addEventListener('click', skipQuestion);
skipBtn.addEventListener('click', skipQuestion);

// Check if user is already logged in (for page refresh)
const loggedInUser = localStorage.getItem('currentUser');
if (loggedInUser) {
  currentUser = JSON.parse(loggedInUser);
  const userData = users.find(u => u.email === currentUser.email);
  if (userData) {
    usernameDisplay.textContent = userData.name;
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    fetchQuestions();
  }
}