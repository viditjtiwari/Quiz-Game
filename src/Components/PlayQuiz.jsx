import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../Config/firebase';

export default function PlayQuiz() {

  const [selectedId, setSelectedId] = useState('');
  const [totalCorrect, setTotalCorrect] = useState([])
  const [pureAns, setPureAns] = useState('');
  const [cAns, setCAns] = useState('')
  const [count, setCount] = useState(0);
  const [correctAns, setCorrectAns] = useState("")
  const [oneData, setOneData] = useState({})
  const [quizData, setQuizData] = useState([])
  var navigate = useNavigate();
  const firebaseUser = localStorage.getItem('firebase_user');
  const score = {
    total : quizData.length,
    correct : totalCorrect.length,
    wrong : ((quizData.length) - (totalCorrect.length))
  }
  localStorage.setItem("score_data" , JSON.stringify(score));

  useEffect(() => {
    if (!firebaseUser) {
      toast.error("Please login first");
      navigate('/');
    }
  }, [])

  useEffect(() => {
    const db = getDatabase(app);
    const getQuiz = ref(db, 'quiz/');
    onValue(getQuiz, (quiz) => {
      const data = quiz.val();
      const finalquiz = [];
      if (data) {
        for (const index in data) {
          finalquiz.push(data[index]);
        }
      }
      setQuizData(finalquiz);

      if (finalquiz.length > 0) {
        const first = finalquiz[0];
        let correctText = "";
        if (first.correct_opt === "A") correctText = first.option1;
        else if (first.correct_opt === "B") correctText = first.option2;
        else if (first.correct_opt === "C") correctText = first.option3;
        else if (first.correct_opt === "D") correctText = first.option4;

        setCorrectAns(correctText);
        setOneData({ ...first, correct_opt: correctText });
      } else {
        setOneData({});
      }
    });
  }, [])

  const changeQuestion = () => {
    if (count == (quizData.length - 1)) {
      navigate('/score')
    } else {
      const newCount = count + 1;
      setCount(newCount);

      const nextQuiz = quizData[newCount];
      let correctText = "";
      if (nextQuiz.correct_opt === "A") correctText = nextQuiz.option1;
      else if (nextQuiz.correct_opt === "B") correctText = nextQuiz.option2;
      else if (nextQuiz.correct_opt === "C") correctText = nextQuiz.option3;
      else if (nextQuiz.correct_opt === "D") correctText = nextQuiz.option4;

      setCorrectAns(correctText);
      setOneData({ ...nextQuiz, correct_opt: correctText });
    }
    setCAns('')
    setSelectedId('')
  }

  const selectOption = (e, i) => {
    if (selectedId) return;

    var userAns = e.target.innerHTML.trim()
    if (userAns == correctAns) {
      setCAns(userAns);
      setTotalCorrect([...totalCorrect, userAns])
    }
    else {
      setCAns(i)
    }
    setPureAns(correctAns)
    setSelectedId(e.target.id)
  }

  return (
    <>
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl my-10">

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Q{count + 1}. {oneData?.question}
        </h2>

        {/* Options */}
        <ul className="space-y-3">

          <li
            className={`p-3 rounded-xl border cursor-pointer transition ${oneData.option1 == cAns
                ? "bg-green-600 text-white border-green-700"
                : (cAns == 1) ? "bg-red-600 text-white border-red-700" : ""
              }
              ${pureAns == oneData.option1 ? "bg-green-600 text-white border-green-700" : ""}`}
            onClick={(e) => selectOption(e, 1)}
            id='1'
            aria-disabled={selectedId ? "true" : "false"}
          >
            {oneData.option1}
          </li>

          <li
            className={`p-3 rounded-xl border cursor-pointer transition ${oneData.option2 == cAns
                ? "bg-green-600 text-white border-green-700"
                : (cAns == 2) ? "bg-red-600 text-white border-red-700" : ""
              }
              ${pureAns == oneData.option2 ? "bg-green-600 text-white border-green-700" : ""}`}
            onClick={(e) => selectOption(e, 2)}
            id='2'
            aria-disabled={selectedId ? "true" : "false"}
          >
            {oneData.option2}
          </li>

          <li
            className={`p-3 rounded-xl border cursor-pointer transition ${oneData.option3 == cAns
                ? "bg-green-600 text-white border-green-700"
                : (cAns == 3) ? "bg-red-600 text-white border-red-700" : ""
              }
              ${pureAns == oneData.option3 ? "bg-green-600 text-white border-green-700" : ""}`}
            onClick={(e) => selectOption(e, 3)}
            id='3'
            aria-disabled={selectedId ? "true" : "false"}
          >
            {oneData.option3}
          </li>

          <li
            className={`p-3 rounded-xl border cursor-pointer transition ${oneData.option4 == cAns
                ? "bg-green-600 text-white border-green-700"
                : (cAns == 4) ? "bg-red-600 text-white border-red-700" : ""
              }
              ${pureAns == oneData.option4 ? "bg-green-600 text-white border-green-700" : ""}`}
            onClick={(e) => selectOption(e, 4)}
            id='4'
            aria-disabled={selectedId ? "true" : "false"}
          >
            {oneData.option4}
          </li>

        </ul>

        {/* Next Button */}
        <button
          onClick={changeQuestion}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-medium transition"
        >
          {count == (quizData.length - 1) ? "Submit" : "Next"}

        </button>

      </div>
    </>
  )
}