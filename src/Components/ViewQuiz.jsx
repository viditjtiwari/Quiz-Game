import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../Config/firebase';

export default function ViewQuiz() {

  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const getQuiz = ref(db, 'quiz/');
    onValue(getQuiz, (quiz) => {
      var finalquiz = [];
      for (var index in quiz.val()) {
        var finalData = quiz.val()[index];
        finalquiz = [...finalquiz, finalData];
      }
      setQuizData(finalquiz);
    });
  }, [])

  return (
    <>
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <Link href="/add-quiz" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400">View Quiz</Link>
            </div>
          </li>
        </ol>
      </nav>
      <nav className="bg-white sticky max-w-screen-xl z-20 top-0 start-0 border-b border-gray-200 mx-auto my-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">View Quiz</h2>
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Question
                </th>
                <th scope="col" className="px-6 py-3">
                  Option 1
                </th>
                <th scope="col" className="px-6 py-3">
                  Option 2
                </th>
                <th scope="col" className="px-6 py-3">
                  Option 3
                </th>
                <th scope="col" className="px-6 py-3">
                  Option 4
                </th>
                <th scope="col" className="px-6 py-3">
                  Correct Answer
                </th>
              </tr>
            </thead>
            <tbody>

              {
                quizData.length > 0
                  ?
                  quizData.map((v, index) => {
                    return (
                      <FetchQuiz key={index} v={v} index={index} />
                    )
                  })
                  :
                  <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-100" >
                    <td colSpan="7" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                      No Data Found !!
                    </td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </nav>
    </>
  )
}

function FetchQuiz({ v, index }) {

  if (v.correct_opt === "A") {
    var correct_opt = v.option1;
  } else if (v.correct_opt === "B") {
    var correct_opt = v.option2;
  } else if (v.correct_opt === "C") {
    var correct_opt = v.option3;
  } else if (v.correct_opt === "D") {
    var correct_opt = v.option4;
  }

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-100">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {index + 1}
      </th>
      <td className="px-6 py-4 text-gray-900">
        {v.question}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {v.option1}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {v.option2}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {v.option3}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {v.option4}
      </td>
      <td className="px-6 py-4">
        {correct_opt}
      </td>
    </tr>
  )
}