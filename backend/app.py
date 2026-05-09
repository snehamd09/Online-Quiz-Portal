from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Score Table
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    quiz_type = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)

# Create DB
with app.app_context():
    db.create_all()

# Home Route
@app.route("/")
def home():
    return {"message": "Backend Running Successfully"}

# Register Route
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    existing_user = User.query.filter_by(username=username).first()

    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid username or password"}), 401

# Questions Route
@app.route("/questions/<quiz_type>")
def get_questions(quiz_type):

    quizzes = {

        "python": [
            {
                "id": 1,
                "question": "Which keyword is used to define a function in Python?",
                "options": ["func", "define", "def", "function"],
                "answer": "def"
            },
            {
                "id": 2,
                "question": "Which data type is immutable?",
                "options": ["List", "Dictionary", "Set", "Tuple"],
                "answer": "Tuple"
            },
            {
                "id": 3,
                "question": "Which symbol is used for comments in Python?",
                "options": ["//", "#", "/*", "--"],
                "answer": "#"
            },
            {
                "id": 4,
                "question": "Which function is used to display output in Python?",
                "options": ["echo()", "display()", "print()", "show()"],
                "answer": "print()"
            },
            {
                "id": 5,
                "question": "Which data type stores True or False values?",
                "options": ["int", "string", "boolean", "float"],
                "answer": "boolean"
            }
        ],

        "web": [
            {
                "id": 1,
                "question": "What does HTML stand for?",
                "options": [
                    "Hyper Text Markup Language",
                    "High Transfer Machine Language",
                    "Home Tool Markup Language",
                    "Hyperlinks Text Management Language"
                ],
                "answer": "Hyper Text Markup Language"
            },
            {
                "id": 2,
                "question": "Which language is used for React?",
                "options": ["Python", "Java", "JavaScript", "C++"],
                "answer": "JavaScript"
            },
            {
                "id": 3,
                "question": "Which CSS property changes text color?",
                "options": ["font-color", "text-color", "color", "background"],
                "answer": "color"
            },
            {
                "id": 4,
                "question": "Which hook is used for state management in React?",
                "options": ["useFetch", "useState", "useData", "useReact"],
                "answer": "useState"
            },
            {
                "id": 5,
                "question": "Which HTML tag is used to create a hyperlink?",
                "options": ["<a>", "<link>", "<href>", "<url>"],
                "answer": "<a>"
            }
        ],

        "cyber": [
            {
                "id": 1,
                "question": "What does VPN stand for?",
                "options": [
                    "Virtual Private Network",
                    "Verified Public Network",
                    "Visual Private Node",
                    "Virtual Protected Network"
                ],
                "answer": "Virtual Private Network"
            },
            {
                "id": 2,
                "question": "Which attack steals user information using fake websites?",
                "options": ["DDoS", "Phishing", "Spoofing", "Sniffing"],
                "answer": "Phishing"
            },
            {
                "id": 3,
                "question": "Which is a strong password?",
                "options": ["123456", "password", "Admin123", "S@fe#2026"],
                "answer": "S@fe#2026"
            },
            {
                "id": 4,
                "question": "Which malware locks files and demands payment?",
                "options": ["Virus", "Spyware", "Ransomware", "Trojan"],
                "answer": "Ransomware"
            },
            {
                "id": 5,
                "question": "What is used to securely hash passwords?",
                "options": ["bcrypt", "HTML", "React", "CSS"],
                "answer": "bcrypt"
            }
        ],

        "cn": [
            {
                "id": 1,
                "question": "Which protocol is used for websites?",
                "options": ["FTP", "HTTP", "SMTP", "SSH"],
                "answer": "HTTP"
            },
            {
                "id": 2,
                "question": "What does IP stand for?",
                "options": [
                    "Internet Protocol",
                    "Internal Process",
                    "Integrated Program",
                    "Internet Process"
                ],
                "answer": "Internet Protocol"
            },
            {
                "id": 3,
                "question": "Which device connects multiple computers in a network?",
                "options": ["Switch", "Monitor", "Printer", "Scanner"],
                "answer": "Switch"
            },
            {
                "id": 4,
                "question": "Which protocol is used to transfer files?",
                "options": ["HTTP", "FTP", "SMTP", "DNS"],
                "answer": "FTP"
            },
            {
                "id": 5,
                "question": "What does DNS stand for?",
                "options": [
                    "Domain Name System",
                    "Data Network Service",
                    "Digital Naming Service",
                    "Domain Network Server"
                ],
                "answer": "Domain Name System"
            }
        ]
    }

    return jsonify(quizzes.get(quiz_type, []))

# Save Score Route
@app.route("/save-score", methods=["POST"])
def save_score():

    data = request.json

    print(data)

    username = data.get("username")
    quiz_type = data.get("quiz_type")
    score = data.get("score")

    new_score = Score(
        username=username,
        quiz_type=quiz_type,
        score=score
    )

    db.session.add(new_score)
    db.session.commit()

    return jsonify({"message": "Score saved successfully"})


# Get Scores Route
@app.route("/scores/<username>")
def get_scores(username):

    scores = Score.query.filter_by(username=username).all()

    result = []

    for score in scores:

        result.append({
            "id": score.id,
            "username": score.username,
            "quiz_type": score.quiz_type,
            "score": score.score
        })

    return jsonify(result)

# Leaderboard Route
@app.route("/leaderboard")
def leaderboard():

    scores = Score.query.order_by(Score.score.desc()).all()

    result = []

    for score in scores:

        result.append({
            "id": score.id,
            "username": score.username,
            "quiz_type": score.quiz_type,
            "score": score.score
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)