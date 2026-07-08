# 🧠 Quiz Game with Authentication

An interactive, browser-based quiz game that fetches trivia questions from the [Open Trivia Database](https://opentdb.com/) API. Players must log in or sign up before playing, and their high scores are tracked locally.

---

## ✨ Features

- **User Authentication** — Sign up and log in with email & password (stored in `localStorage`)
- **Dynamic Questions** — Trivia questions fetched in real-time from the Open Trivia Database API
- **Timed Rounds** — 15-second countdown timer per question
- **Answer Feedback** — Correct answers highlighted in green, wrong answers in red with the correct answer revealed
- **Score Tracking** — Live score display with persistent high-score tracking per user
- **Skip / Next** — Skip difficult questions or move to the next one
- **Auto-Login** — Session persistence across page refreshes
- **Infinite Play** — New questions are automatically fetched when the current batch runs out
- **Responsive Design** — Works on desktop and mobile devices

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, animations, glassmorphism effects |
| **Vanilla JavaScript** | Game logic, authentication, API calls |
| **Google Fonts (Poppins)** | Typography |
| **Open Trivia DB API** | Trivia question source |
| **localStorage** | Client-side user data & session persistence |

---

## 📁 Project Structure

```
Quiz-Game/
├── index.html
├── script.js
├── styles.css
├── README.md
└── assets/     


---

## 🚀 Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server, Node.js, or package manager required

### Option 1 — Open Directly

1. **Clone the repository**
   ```bash
   git clone https://github.com/arpitha-5/Quiz-Game.git
   cd Quiz-Game
   ```

2. **Open `index.html`** in your browser
   - Double-click `index.html`, **or**
   - Right-click → *Open with* → your preferred browser

### Option 2 — Using VS Code Live Server

1. **Install** the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

2. **Open the project folder** in VS Code:
   ```bash
   code .
   ```

3. **Right-click `index.html`** → select **"Open with Live Server"**.

4. The app will launch at `http://127.0.0.1:5500` (or a similar port).

### Option 3 — Using Python's HTTP Server

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

> [!NOTE]
> The background image in `styles.css` references a local file path. You may want to replace it with your own image or a placeholder. Update the `background` property in the `body` rule inside `styles.css`.

---

## 🎮 How to Play

1. **Sign Up** — Create an account with your name, email, and password.
2. **Log In** — Use your credentials to access the quiz.
3. **Answer Questions** — Click on the correct option before the 15-second timer runs out.
4. **Score Points** — Each correct answer adds 1 point to your score.
5. **Skip** — Use the Skip or Next button to skip a question (no penalty).
6. **Keep Going** — New questions load automatically — play as long as you want!
7. **Logout** — Click the logout button in the top-right corner when done.

---

## 🌐 API Reference

This project uses the **Open Trivia Database** (no API key required):

| Detail | Value |
|--------|-------|
| **Endpoint** | `https://opentdb.com/api.php` |
| **Questions per batch** | 5 |
| **Question type** | Multiple choice |
| **Documentation** | [opentdb.com/api_config.php](https://opentdb.com/api_config.php) |

---

## ⚙️ Configuration

| Setting | Location | Default |
|---------|----------|---------|
| Timer duration | `script.js` → `timerValue` | `15` seconds |
| Questions per fetch | `script.js` → `fetchQuestions()` URL | `5` |
| Background image | `styles.css` → `body` rule | Local file path |
| Primary color | `styles.css` | `#3498db` |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Questions not loading | Check your internet connection; the app fetches from an external API |
| Background image not showing | Update the `background` URL in `styles.css` to a valid image path |
| Login not working | Ensure you've signed up first; credentials are stored in `localStorage` |
| Data lost after clearing browser data | User accounts and scores are stored in `localStorage` — clearing browser data will erase them |

---

## 🔮 Future Enhancements

- [ ] Difficulty level selector (Easy / Medium / Hard)
- [ ] Category selection for quiz topics
- [ ] Leaderboard page with all user scores
- [ ] Backend authentication with a database
- [ ] Question bookmarking and review mode
- [ ] Sound effects and animations for correct/wrong answers

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---


<p align="center">
  Made with ❤️ by Arpitha Medharametla
</p>
