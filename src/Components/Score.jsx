import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../Config/firebase';
import { useNavigate } from 'react-router';

export default function Score() {

    const [totalQuestion, setTotalQuestion] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalwrong, setTotalWrong] = useState(0);
    const data = localStorage.getItem('score_data')
    const score = JSON.parse(data);
    const navigate = useNavigate();

    useEffect(() => {
        setTotalQuestion(score.total)
        setTotalCorrect(score.correct)
        setTotalWrong(score.wrong)
    }, [])

    const percentage = Math.round((totalCorrect / totalQuestion) * 100);

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg text-center">

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Quiz Completed!
                    </h2>

                    {/* Score Circle */}
                    <div className="flex justify-center mb-6">
                        <div className="h-28 w-28 rounded-full border-8 border-indigo-600 flex flex-col justify-center items-center">
                            <span className="text-3xl font-bold text-indigo-600">{percentage}%</span>
                            <span className="text-xs font-semibold text-gray-600">Score</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
                            <span className="font-medium">Total Questions</span>
                            <span className="font-bold">{totalQuestion}</span>
                        </div>

                        <div className="flex justify-between bg-green-100 p-3 rounded-lg">
                            <span className="font-medium">Correct Answers</span>
                            <span className="font-bold text-green-700">{totalCorrect}</span>
                        </div>

                        <div className="flex justify-between bg-red-100 p-3 rounded-lg">
                            <span className="font-medium">Wrong Answers</span>
                            <span className="font-bold text-red-700">{totalwrong}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-medium transition" onClick={() => {
                            navigate("/play-quiz")
                        }}>
                            Play Again
                        </button>

                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-lg font-medium transition" onClick={() => {
                            navigate("/")
                        }}>
                            Go Home
                        </button>
                    </div>

                </div>
            </div>
            );
        </>
    )
}
