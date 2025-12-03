import React, { useState } from 'react'
import { Link } from 'react-router'
import { getDatabase, ref, set } from "firebase/database";
import app from '../Config/firebase';
import { toast } from 'react-toastify';

export default function AddQuiz() {

  const [isLoading, setIsLoading] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);


    const db = getDatabase(app);

    const data = {
      question: e.target.question.value,
      option1: e.target.opt_1.value,
      option2: e.target.opt_2.value,
      option3: e.target.opt_3.value,
      option4: e.target.opt_4.value,
      correct_opt: e.target.correct_opt.value
    }

    set(ref(db, 'quiz/' + Date.now()), data);

    e.target.reset();
    toast.success("Quiz Added Successfully");
    setIsLoading(false);
  }

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
              <Link href="/add-quiz" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400">Add Quiz</Link>
            </div>
          </li>
        </ol>
      </nav>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Add a New Quiz</h2>
          <form onSubmit={formHandler} autoComplete='off'>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900">Enter the Question</label>
                <input type="text" name="question" id="question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Question" required="required" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="opt_1" className="block mb-2 text-sm font-medium text-gray-900">Enter the Option 1</label>
                <input type="text" name="opt_1" id="opt_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Option 1" required="required" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="opt_2" className="block mb-2 text-sm font-medium text-gray-900">Enter the Option 2</label>
                <input type="text" name="opt_2" id="opt_2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Option 2" required="required" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="opt_3" className="block mb-2 text-sm font-medium text-gray-900">Enter the Option 3</label>
                <input type="text" name="opt_3" id="opt_3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Option 3" required="required" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="opt_4" className="block mb-2 text-sm font-medium text-gray-900">Enter the Option 4</label>
                <input type="text" name="opt_4" id="opt_4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Option 4" required="required" />
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor="correct_opt" className="block mb-2 text-sm font-medium text-gray-900">Correct Option</label>
                <select id="correct_opt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option defaultValue="">Select Correct Option</option>
                  <option value="A">Option 1</option>
                  <option value="B">Option 2</option>
                  <option value="C">Option 3</option>
                  <option value="D">Option 4</option>
                </select>
              </div>
            </div>
            <button type="submit" className="mt-5 inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled={isLoading == 1 ? "disabled" : ""}>
              {
                isLoading
                  ?
                  <>
                    <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing…
                  </>
                  :
                  "Add Quiz"
              }
            </button>



          </form>
        </div>
      </section>
    </>
  )
}
