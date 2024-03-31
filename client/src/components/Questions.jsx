import { useEffect, useState } from "react";
import './Questions.css';
import { useDispatch, useSelector } from "react-redux";
import { saveUserAnswer } from "../rtk/reducers/userAnswers";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

function Questions() {
    
    const userAnswers = useSelector((state) => state.userAnswers);
    let dispatch = useDispatch();

    const [questions, setQuestions] = useState(null);
    const [index, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);

    useEffect(() => {
        fetch('https://quiz-app-1vbc.onrender.com/api/questions')
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            setQuestions(json.data.questions)
        })
    }, [])

    let isLastQuestion = false;

    if (questions !== null) {
        isLastQuestion = index === questions.length - 1;
    }

    // check if user answer current question before
    if (userAnswers[index] !== undefined) {
        let prevUserAnswer = userAnswers[index];
        if (userAnswer === null) {
            setUserAnswer(prevUserAnswer);
        }
    }

    if (!questions) return <Loading />;

    return (
        <div className="questions-page">
            <div className="container lg:px-10 sm:px-5">
                <h3 className="font-bold text-2xl">
                    {index + 1}: {questions[index].title}
                </h3>
                <form onChange={(e) => {
                    setUserAnswer(e.target.id);
                }} className="answers mt-10 mb-20">
                    {questions[index].answers.map((answer) => (
                        <div key={`${answer} ${index + 1}`} 
                        className="answer text-xl mb-5">
                            <input type="radio" name="answer" id={answer} 
                                defaultChecked={userAnswer === answer} />
                            <label className="relative block font-bold ml-12 transition cursor-pointer" htmlFor={answer}>
                                {answer}
                            </label>
                        </div>
                    ))}
                </form>
                <div className='control-btns flex justify-between'>
                    <button onClick={() => {

                        if (index !== 0) {
                            setIndex(index - 1);
                            setUserAnswer(null);
                        }

                    }} className={`prev ${index === 0 && 'invisible'} select-none btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500`}>Prev</button>                    

                    {!isLastQuestion ? (
                        <button onClick={() => {

                            if (userAnswer) {
                                dispatch(saveUserAnswer({userAnswer, index}));
                                setUserAnswer(null);
                                setIndex(index + 1);
                            }

                        }} className='next select-none btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500'>
                            Next
                        </button>

                    ) : ( // only in last question

                        <Link to={'/result'} onClick={() => {

                            if (userAnswer) {
                                dispatch(saveUserAnswer({userAnswer, index}));
                            }

                        }} className={`finish ${!userAnswer && 'pointer-events-none'} select-none btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500`}>
                            Finish
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Questions;
