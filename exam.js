let questions = [];
let currentIndex = 0;
let answers = [];
let marked = [];
let totalTime = 30 *60;
let timer;
const letters = ["A", "B", "C", "D"];

async function loadQuestions() {
  const res = await fetch("questions.json");
  questions = await res.json();
  shuffleQuestions();
  answers = new Array(questions.length).fill(null);
  marked = [];
  showQuestion();
  startTimer();
}

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("qText").textContent = q.question;
  document.getElementById("qBadge").textContent = `QUESTION ${currentIndex + 1} / ${questions.length}`;
  const container = document.getElementById("choicesContainer");
  container.innerHTML = "";
  for (let i = 0; i < q.answers.length; i++) {
    const choice = document.createElement("div");
    choice.className = "choice";
    if (answers[currentIndex] === i)
      choice.classList.add("selected");
      choice.onclick = function () {
      selectAnswer(i);
    };
    const letter = document.createElement("div");
    letter.className = "choice-letter";
    letter.textContent = letters[i];
    const text = document.createElement("div");
    text.className = "choice-text";
    text.textContent = q.answers[i].text;
    choice.appendChild(letter);
    choice.appendChild(text);
    container.appendChild(choice);
  }
  updateNav();
  updateProgress();
  updateMarkBtn();
}

function selectAnswer(i) {
  answers[currentIndex] = i;
  showQuestion();
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function updateNav() {
  const prevBtn = document.getElementById("btnPrev");
  const nextBtn = document.getElementById("btnNext");
  if (currentIndex === 0)  prevBtn.disabled = true; 
  else  prevBtn.disabled = false; 
  if (currentIndex === questions.length - 1)  nextBtn.disabled = true; 
  else  nextBtn.disabled = false; 
}

function updateProgress() {
  let answered = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== null) answered++;
  }
  const percent = Math.round((answered / questions.length) * 100);
  document.getElementById("examProgressFill").style.width = percent + "%";
  document.getElementById("examProgressCountBottom").textContent = answered + " / " + questions.length + " Answered";
}

function toggleMark() {
  const index = marked.indexOf(currentIndex);
  if (index === -1) marked.push(currentIndex);
  else marked.splice(index, 1);
  updateMarkList();
  updateMarkBtn();
}

function updateMarkBtn() {
  const btn = document.getElementById("btnMark");
  if (marked.includes(currentIndex)) btn.classList.add("active");
  else btn.classList.remove("active");
}

function updateMarkList() {
  const list = document.getElementById("markList");
  list.innerHTML = "";
  if (marked.length === 0) {
    list.innerHTML = '<div class="mark-empty">No marked questions yet.</div>';
    return;
  }
  for (let i = 0; i < marked.length; i++) {
    const item = document.createElement("div");
    item.className = "mark-item";
    item.textContent = "Question " + (marked[i] + 1);
    item.onclick = function () {
      currentIndex = marked[i];
      showQuestion();
    };
    list.appendChild(item);
  }
}

function startTimer() {
  const timerText = document.getElementById("timerText");
  timer = setInterval(function () {
    totalTime--;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timerText.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    if (totalTime <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  localStorage.setItem("timesUp", "true");
  submitExam();
}

function submitExam() {
  let correct = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] !== null && questions[i].answers[answers[i]].correct) {
      correct++;
    }
  }
  let wrong = questions.length - correct;
  localStorage.setItem("examResult", JSON.stringify({ correct, wrong, total: questions.length }));
  window.location.href = "result.html";
}

loadQuestions();