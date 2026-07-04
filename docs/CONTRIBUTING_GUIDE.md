# Contributor Guide

This document is meant for anyone who wants to modify or extend this project. It explains the main tools and patterns used here and highlights the important things to keep in mind before creating new pages or features.

---

## 1. What is used in this project

### Core technologies
- React for building the UI
- Vite for development and build tooling
- React Router for page navigation
- Firebase Realtime Database for storing quiz questions
- Firebase Authentication for login and registration
- Tailwind CSS for styling
- React Toastify for showing alerts and success/error messages
- localStorage for simple persistence of auth state and quiz score

### Main project structure
- src/main.jsx: app entry point and route definitions
- src/Components/: all UI components
- src/Components/Common/: shared layout pieces like Header and Footer
- src/Components/Auth/: login and registration pages
- src/Config/firebase.js: Firebase initialization
- src/assets/CSS/style.css: global CSS entry point

---

## 2. Important things to keep in mind before making changes

### A. Follow the existing routing pattern
All pages are registered in src/main.jsx using React Router.

If you create a new page:
- import it properly in src/main.jsx
- add a new Route entry
- make sure the page is wrapped by RootLayout so it gets shared layout, auth context, and toast support

### B. Use the shared authentication context
Authentication logic is centralized in src/Components/ContextAPI.jsx.

If you create a new page that depends on login state:
- use the existing Context API rather than creating a separate auth system
- read the login status from the shared context
- keep user state consistent with localStorage

### C. Keep Firebase access consistent
Quiz data is stored in Firebase Realtime Database under the quiz node.

If you add new data features:
- use the same Firebase initialization from src/Config/firebase.js
- follow the same database reference style used in AddQuiz.jsx and ViewQuiz.jsx
- ensure your data structure is predictable and easy to read

### D. Preserve the current quiz data shape
The current quiz item structure is expected to look like this:
- question
- option1
- option2
- option3
- option4
- correct_opt

If you change this structure:
- update the components that read and write it
- especially AddQuiz.jsx, ViewQuiz.jsx, and PlayQuiz.jsx

### E. Remember that score flow is currently local
The quiz result is stored in localStorage under score_data.

If you want to change how results are handled:
- update both PlayQuiz.jsx and Score.jsx together
- keep the data format consistent

### F. Keep the UI style consistent
The project uses Tailwind CSS classes throughout the components.

Before adding a new page or component:
- match the current styling style
- reuse Tailwind utility classes where possible
- keep spacing, colors, and component structure visually consistent with the existing app

### G. Use toast messages for user feedback
The app already uses React Toastify.

If you add actions such as save, delete, login, or error handling:
- show a toast message so users understand what happened

### H. Be careful with localStorage
The app uses localStorage for:
- firebase_user
- score_data

If you add new persistent values:
- use clear key names
- avoid overwriting existing keys accidentally
- consider whether the data should really be stored locally or in Firebase

---

## 3. Before creating a new page

Check these points first:
1. Does this page need authentication?
2. Does it need to read/write Firebase data?
3. Should it be part of the shared layout?
4. Does it need a new route in src/main.jsx?
5. Does it need navigation links in the Header?
6. Does it need a new state or context value?

---

## 4. Before creating a new component

Ask yourself:
- Is this component reusable or is it only for one page?
- Does it need props or context?
- Does it need its own local state?
- Will it need Firebase or localStorage access?
- Does it need to share data with another component?

If the component is shared across multiple pages, consider placing it in a common folder or reusing an existing pattern.

---

## 5. Recommended development approach

When adding new features:
- keep changes small and focused
- follow the current component structure
- reuse existing components where possible
- make sure the new feature works with the existing auth and quiz flow
- test the app after modifications

---

## 6. Quick summary
If someone wants to work on this project, the most important things to remember are:
- use the existing routing and layout system
- keep authentication logic centralized
- use Firebase consistently
- preserve the quiz data structure
- keep styling aligned with the current Tailwind-based UI
- use toast feedback and avoid breaking the existing state flow
