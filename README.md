# QUIZ Time — Online Examination System

## 📸 Pages Overview

| Page | File | Description |
|---|---|---|
| Register | `register.html` | Create a new account |
| Login | `login.html` | Sign in to your account |
| Exam | `exam.html` | Take the timed examination |
| Result | `result.html` | View your score and grade |

---

## ✨ Features

- **User Registration & Login** — form validation with live feedback, duplicate email detection, and password strength enforcement
- **Timed Exam** — 30-minute countdown with animated progress bar that shifts color as time runs low
- **Question Navigation** — previous/next buttons, question dot grid, and mark-for-review system
- **Responsive Sidebar** — full question overview on desktop, slide-in drawer on mobile
- **Graded Results** — five grade levels (Excellent, Very Good, Good, Pass, Fail) with animated SVG score ring
- **Retake Option** — failed students get a retake button on the result screen
- **History Guard** — back-arrow navigation after logout is blocked using `location.replace()`
- **Persistent Storage** — all data stored in `localStorage`, no server required
- **Fully Responsive** — works on mobile, tablet, and desktop

---


## 🧠 How It Works

### Authentication

- On registration, the user object is saved to `localStorage` under two keys:
  - `users` — array of all registered users
  - `currentUser` — the currently active user
- On login, the app searches the `users` array for a matching email and password
- On success, `loggedIn: 'true'` is set in `localStorage`
- Each page checks this key at load time and redirects if the user shouldn't be there

### Validation

All fields use real-time regex validation with live ✅ / ❌ feedback icons:

| Field | Rule |
|---|---|
| First / Last Name | Letters only (including Arabic & accented), 2–50 characters |
| Email | Must match `user@domain.tld` format |
| Password | Min 8 chars, requires uppercase, lowercase, digit, and special character |
| Confirm Password | Must exactly match the password field |

### Exam Engine

- 15 questions shuffled randomly on each load using Fisher-Yates shuffle
- Answers stored in memory during the exam session
- Timer counts down from 30 minutes; submits automatically on timeout
- Questions can be marked for review (⭐) and revisited from the sidebar


---

## 💾 localStorage Schema

| Key | Type | Description |
|---|---|---|
| `users` | `JSON Array` | All registered user objects |
| `currentUser` | `JSON Object` | Currently logged-in user |
| `loggedIn` | `'true'` string | Auth flag, removed on logout |
| `examResult` | `JSON Object` | Score data passed to result page |
| `timesUp` | `'true'` string | Set when exam timer expires |

---


## 🚀 Getting Started

No build tools or server required. Just open the files in a browser.

```bash
# Clone or download the project
git clone https://github.com/MariamAboslema/Examination-System.git

# Open in browser
open register.html
```

---

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **ES6**
- **Bootstrap 5**
- **Google Fonts**

