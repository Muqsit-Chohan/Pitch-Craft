# 🚀 PitchCraft – AI Pitch Generator

PitchCraft is an AI-based web app that helps users create professional business pitches using **Google Gemini API**.  
It is built with **React + Vite**, styled using **Tailwind CSS**, and powered by **Firebase Authentication** and **Firestore**.

---

## 🌐 Live Demo

- [Main Page](https://pictchcraft-muqsit.netlify.app/)
- [Dashboard](https://pictchcraft-muqsit.netlify.app/dashboard)
- [Create Pitch](https://pictchcraft-muqsit.netlify.app/creatPitch)
- [Generated Pitch](https://pictchcraft-muqsit.netlify.app/generatedPitch)

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Google Sign-In)
- 🧠 Google Gemini AI Integration for pitch generation
- ☁️ Firestore Database for storing user pitches
- 💼 Dashboard for viewing and managing pitches
- 🧾 Create Pitch page with easy-to-use form
- 📄 Generated Pitch page to view AI-generated results
- 🎨 Beautiful UI with Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **AI Model:** Google Gemini API
- **Hosting:** Netlify

---

## 🚧 Future Improvements

- Export pitch as PDF or PPT
- Add templates and themes
- Add collaboration feature
- AI tone customization (formal, casual, investor-focused)
- Dark/Light mode toggle

---

### 1. Clone the Repository

git clone https://github.com/your-username/pitchcraft.git
cd pitchcraft

### 2. Install Dependencies

**npm install**

### 3. Firebase Setup

- Go to Firebase Console
- Create a new project.
- Enable Authentication → Email/Password and Google.
- Enable Cloud Firestore.
- Copy your Firebase config and paste it in src/firebase/firebaseConfig.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

### 4. Google Gemini API Setup

- Go to Google AI Studio
- Generate your API key.
- Create a .env file in your project root and add:
- VITE_GEMINI_API_KEY=your_api_key_here

### 5. Run the App

- npm run dev

---

### 👨‍💻 Author

**Abdul Muqsit Chohan**
- Frontend Developer | UI/UX Designer

### 📧 Email: muqsit816@gmail.com
