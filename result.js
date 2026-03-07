const result = JSON.parse(localStorage.getItem("examResult"));
const timesUp = localStorage.getItem("timesUp") === "true";
if (timesUp) {
  document.getElementById("timeoutBanner").style.display = "block";
  localStorage.removeItem("timesUp");
}
const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
const name = user.firstName || "Student";
const correct = result.correct;
const total = result.total;
const wrong = result.wrong;
let grade = "";
let badgeClass = "";
let icon = "";
let title = "";
let subtitle = "";

if (correct >= 13) {
  grade = "Excellent";
  badgeClass = "badge-success";
  icon = "👏";
  title = `Congratulations ${name}!`;
  subtitle = "You passed the exam successfully 🎉";
}
else if (correct >= 11) {
  grade = "Very Good";
  badgeClass = "badge-success";
  icon = "👏";
  title = `Congratulations ${name}!`;
  subtitle = "You passed the exam successfully 🎉";
}
else if (correct >= 9) {
  grade = "Good";
  badgeClass = "badge-success";
  icon = "👏";
  title = `Congratulations ${name}!`;
  subtitle = "You passed the exam successfully 🎉";
}
else if (correct === 8) {
  grade = "Pass";
  badgeClass = "badge-success";
  icon = "😔";
  title =`You Passed ${name}`;
  subtitle = "You passed with the minimum passing score";
}
else {
  grade = "Fail";
  badgeClass = "badge-fail";
  icon = "😔";
  title = `You Failed ${name}`;
  subtitle = "Better luck next time.";
}
document.getElementById("resultIcon").textContent = icon;
const badge = document.getElementById("resultBadge");
badge.textContent = grade;
badge.classList.add(badgeClass);
document.getElementById("resultTitle").textContent = title;
document.getElementById("resultSubtitle").textContent = subtitle;
document.getElementById("scoreNum").textContent = correct + "/" + total;
const statsRow = document.getElementById("statsRow");
statsRow.innerHTML = `
<div class="stat-box">
<span class="stat-box-num">${correct}</span>
<span class="stat-box-label">Correct</span>
</div>
<div class="stat-box">
<span class="stat-box-num">${wrong}</span>
<span class="stat-box-label">Wrong</span>
</div>
<div class="stat-box">
<span class="stat-box-num">${total}</span>
<span class="stat-box-label">Total</span>
</div>
`;
const percent = correct / total;
const circle = document.getElementById("scoreCircle");
const circumference = 364.4;
circle.style.strokeDashoffset = circumference - percent * circumference;
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  localStorage.removeItem('userName');
  localStorage.removeItem('examResult');
  localStorage.removeItem('timesUp');
  window.location.href = 'register.html';
}