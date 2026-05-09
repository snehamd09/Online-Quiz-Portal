# Online Quiz Portal

A full-stack quiz application built using React.js, Flask, and SQLite.  
The project allows users to register, log in securely, attend quizzes from different categories, track quiz history, and view leaderboard rankings.

---

## 🚀 Features

- User Registration & Login
- Secure Password Hashing using bcrypt
- Multiple Quiz Categories
- Timer-Based Quiz System
- Dynamic Question Loading
- Quiz History Tracking
- Leaderboard System
- Responsive Dashboard UI
- REST API Integration
- SQLite Database Storage

---

## 🛠 Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- Flask-Bcrypt

### Database
- SQLite

---

## 📂 Project Structure

Online-Quiz-Portal
│
├── backend
│ ├── app.py
│ └── instance
│
├── frontend
│ ├── src
│ ├── public
│ ├── package.json
│ └── vite.config.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/snehamd09/Online-Quiz-Portal.git

2. Backend Setup

Open terminal inside backend folder:

pip install flask flask-cors flask-sqlalchemy flask-bcrypt
python app.py

Backend runs at:

http://127.0.0.1:5000

3. Frontend Setup

Open another terminal inside frontend folder:

npm install
npm install axios react-router-dom
npm install -D tailwindcss @tailwindcss/vite
npm run dev

Frontend runs at:

http://localhost:5173
