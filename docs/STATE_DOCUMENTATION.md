# Component State Reference

This document explains the main state values used across the project and what each one is responsible for.

> Home.jsx was intentionally excluded from this document as requested.

---

## 1. ContextAPI.jsx

| State / Value | Type | Responsibility |
| --- | --- | --- |
| isLogin | boolean | Tracks whether the user is currently logged in. |
| isLoading | boolean | Shows a loading spinner during register/login requests. |
| isGoogleLogin | boolean | Tracks whether Google sign-in is currently in progress. |

### What these states do
- isLogin controls whether the Header shows Login/Register buttons or Logout.
- isLoading is used by Login.jsx and Register.jsx to show progress feedback.
- isGoogleLogin controls Google authentication button loading state.

---

## 2. AddQuiz.jsx

| State / Value | Type | Responsibility |
| --- | --- | --- |
| isLoading | boolean | Indicates whether the quiz submission is being processed. |

### What this state does
- it enables the submit button loading UI while the form is sending data to Firebase.

---

## 3. ViewQuiz.jsx

| State / Value | Type | Responsibility |
| --- | --- | --- |
| quizData | array | Stores all quiz questions loaded from Firebase Realtime Database. |

### What this state does
- it holds the full list of questions so the table can render them.
- it updates whenever Firebase pushes new data.

---

## 4. PlayQuiz.jsx

| State / Value | Type | Responsibility |
| --- | --- | --- |
| selectedId | string | Prevents the user from selecting more than one option for the current question. |
| totalCorrect | array | Tracks the user’s correct answers so the final score can be calculated. |
| pureAns | string | Stores the correct answer text for the active question. |
| cAns | string | Stores the current selected answer or the selected option index for visual feedback. |
| count | number | Tracks the current question index. |
| correctAns | string | Stores the correct answer text for the active quiz item. |
| oneData | object | Stores the current question object being displayed. |
| quizData | array | Stores the entire quiz list loaded from Firebase. |

### What these states do
- selectedId prevents repeated clicks on the same question after an answer has been chosen.
- totalCorrect is used to compute how many questions were answered correctly.
- pureAns is used to highlight the correct option after the user answers.
- cAns is used to highlight the answer the user chose and show whether it was correct or incorrect.
- count controls which question is being displayed.
- correctAns is the value compared against the user’s selection.
- oneData is the live current question data passed to the UI.
- quizData is the full quiz dataset used to move through questions and calculate score totals.

---

## 5. Score.jsx

| State / Value | Type | Responsibility |
| --- | --- | --- |
| totalQuestion | number | Stores the total number of quiz questions. |
| totalCorrect | number | Stores the number of correct answers. |
| totalwrong | number | Stores the number of wrong answers. |

### What these states do
- they power the summary cards and progress percentage displayed on the results screen.

---

## 6. Components That Use Context Instead of Local State

### Login.jsx
- Does not manage its own local state for auth.
- Uses the shared auth functions from ContextAPI.jsx.

### Register.jsx
- Does not manage its own local state for auth.
- Uses the shared auth functions from ContextAPI.jsx.

### Header.jsx
- Does not keep its own local state for auth.
- Reads auth status from ContextAPI.jsx through useContext.

---

## 7. Non-Component State Values

These are not React state values, but they still matter to application behavior:

| Value | Where | Responsibility |
| --- | --- | --- |
| localStorage.firebase_user | browser storage | Stores the logged-in Firebase user ID so auth state can survive refresh. |
| localStorage.score_data | browser storage | Stores the quiz score so the Score page can display results after navigation. |

---

## 8. Quick Summary
If you want to understand the app quickly, these are the most important state values:
- isLogin: controls authentication visibility
- quizData: holds the quiz list
- oneData: holds the current question
- count: tracks which question is being shown
- totalCorrect: tracks correct answers
- selectedId: prevents repeated answer selection

These values are the core of the app’s behavior.
