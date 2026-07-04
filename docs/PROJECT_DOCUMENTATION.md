# Quiz Project Documentation

## Overview
This project is a React + Vite quiz application that combines Firebase Authentication and Firebase Realtime Database to provide a simple end-to-end quiz experience.

Users can:
- register and log in
- add quiz questions
- view saved quiz questions
- play the quiz
- see the final score

The application uses React Router for page navigation, Tailwind CSS for styling, and Firebase for persistence.

> Note: Home.jsx was intentionally excluded from this document as requested.

---

## 1. Project Architecture

### Frontend stack
- React 19
- Vite
- React Router
- Tailwind CSS
- Firebase JavaScript SDK
- React Toastify

### Main application flow
1. The app starts from src/main.jsx.
2. The router defines several routes and renders the correct component for each one.
3. Every page is wrapped by RootLayout, which provides:
   - the shared authentication context
   - the global toast container
   - the common header and footer
4. Authentication state is stored in the browser with localStorage.
5. Quiz questions are stored in Firebase Realtime Database under the quiz node.
6. The quiz-taking experience is handled locally in PlayQuiz.jsx and the score is stored in localStorage for the results screen.

---

## 2. How the Application Works

### Authentication flow
- Users can sign up or sign in using the Auth pages.
- Authentication logic is centralized in ContextAPI.jsx.
- Successful login/register stores the Firebase user ID in localStorage.
- The Header component reads the auth state and shows either a logout button or login/register buttons.
- The PlayQuiz page checks for a logged-in user and redirects back home if no user is found.

### Quiz management flow
- AddQuiz.jsx collects a question and four options from a form.
- The form data is pushed to the Firebase Realtime Database using a timestamp-based key.
- ViewQuiz.jsx listens to the quiz node and renders all stored questions in a table.

### Quiz-taking flow
- PlayQuiz.jsx loads all quiz questions from Firebase.
- It shows one question at a time.
- The user selects an answer.
- The component compares the chosen answer with the correct answer.
- The result is tracked and the user moves to the next question.
- When the quiz ends, the user is redirected to the score page.

### Score flow
- PlayQuiz.jsx calculates the score and stores it in localStorage under the key score_data.
- Score.jsx reads that data and displays total questions, correct answers, wrong answers, and percentage.

---

## 3. File-by-File Documentation

### src/main.jsx
This is the app entry point.

Responsibilities:
- mounts the React application into the root DOM element
- sets up BrowserRouter for page navigation
- defines all main routes of the application
- imports the main page-level components

Routes defined:
- / -> Home
- /view-quiz -> ViewQuiz
- /add-quiz -> AddQuiz
- /play-quiz -> PlayQuiz
- /register -> Register
- /login -> Login
- /score -> Score

### src/Components/Common/RootLayout.jsx
This is the shared layout wrapper for the app.

Responsibilities:
- wraps all route pages with ContextAPI so global auth state is available everywhere
- renders ToastContainer so toast messages can appear globally
- renders Header and Footer on every page
- renders the current route content using Outlet

Why it matters:
- it keeps the app consistent by ensuring common UI pieces and shared state are available across pages

### src/Components/Common/Header.jsx
This component renders the top navigation bar.

Responsibilities:
- shows the app logo and branding
- provides links to Home, Add Quiz, Play Quiz, and View Quiz
- uses the authentication context to decide whether to show Login/Register buttons or a Logout button

Behavior:
- when isLogin is true, the header displays a Logout button
- otherwise it displays Login and Register buttons

### src/Components/Common/Footer.jsx
This is a simple static footer component.

Responsibilities:
- displays footer branding and navigation links
- provides a basic closing section for the app layout

### src/Components/ContextAPI.jsx
This file creates the shared authentication context and all authentication-related logic.

Responsibilities:
- manages login state with isLogin
- manages loading state during auth requests with isLoading
- tracks whether Google sign-in is in progress with isGoogleLogin
- exposes register, login, logout, and googleLogin functions through context
- stores the Firebase user ID in localStorage on successful auth
- redirects users after successful auth using navigate

Why it is important:
- it centralizes authentication behavior rather than repeating it across login/register forms

### src/Components/Auth/Login.jsx
This component renders the login form.

Responsibilities:
- collects the user email and password
- submits the form using the shared login function from ContextAPI
- shows a loading spinner while authentication is in progress
- offers a Google sign-in button
- links to the register page

### src/Components/Auth/Register.jsx
This component renders the registration form.

Responsibilities:
- collects a new user email and password
- submits the form using the shared register function from ContextAPI
- shows loading state while registration is processing
- offers Google sign-in as an alternative
- links to the login page

### src/Components/AddQuiz.jsx
This component provides the form to create new quiz questions.

Responsibilities:
- collects question text, four answer options, and the correct answer selection
- uses Firebase Realtime Database to store the new quiz record
- shows a loading state while submitting
- resets the form after successful submission
- displays a success toast message

Data stored for each quiz entry:
- question
- option1
- option2
- option3
- option4
- correct_opt

The database key is generated using Date.now(), which gives each question a unique identifier.

### src/Components/ViewQuiz.jsx
This component displays all stored quiz questions in a table.

Responsibilities:
- subscribes to the quiz data in Firebase Realtime Database
- converts the database snapshot into a regular array of quiz objects
- renders each question with all options and the correct answer
- shows a fallback message when no questions exist

Implementation detail:
- it uses onValue to stay connected to the database updates
- this means any new quiz added will appear automatically

### src/Components/PlayQuiz.jsx
This is the core quiz-playing component.

Responsibilities:
- ensures the user is logged in before starting the quiz
- fetches all quiz questions from Firebase
- displays one question at a time
- allows the user to select an option
- highlights correct and incorrect answers visually
- tracks the number of correct answers
- moves to the next question or finishes the quiz
- stores the final score in localStorage for the score screen

Key behavior:
- the component reads the current question from oneData
- it uses count to decide which question is currently active
- it uses selectedId to prevent multiple answer selections per question
- it sets the correct answer text separately from the option values so the UI can compare user input with the right answer

### src/Components/Score.jsx
This component displays the final quiz results.

Responsibilities:
- reads the score information stored in localStorage
- extracts total questions, correct answers, and wrong answers
- calculates the percentage score
- shows a visual summary of the result
- offers buttons to play again or return home

### src/Config/firebase.js
This file initializes the Firebase app using environment variables.

Responsibilities:
- reads Firebase configuration from VITE_* environment variables
- initializes Firebase with initializeApp
- exports the initialized app object for use by other components

### src/assets/CSS/style.css
This file currently contains the Tailwind CSS import.

Responsibilities:
- loads Tailwind base styles into the app
- provides the styling foundation used by the JSX components

### package.json
This file defines the project scripts and dependencies.

Key scripts:
- npm run dev -> start the Vite development server
- npm run build -> build the production bundle
- npm run lint -> run ESLint checks
- npm run preview -> preview the built app

---

## 4. Important Notes About the Current Implementation

- The app stores the current score in localStorage rather than in a database.
- Authentication state is persisted only through localStorage and Firebase auth, not through a separate global store.
- The quiz flow is simple and local to the PlayQuiz component; it does not yet include advanced features such as timers, shuffle, or persistence of quiz progress.
- The UI is styled with Tailwind CSS and uses a modern, minimal layout.

---

## 5. Summary
This project is a compact but complete quiz application with:
- user authentication
- Firebase-backed quiz storage
- quiz creation and viewing
- quiz-taking and scoring

It is a good example of combining React component state, routing, Firebase, and shared context in a small application.
