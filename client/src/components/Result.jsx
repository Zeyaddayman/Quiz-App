import { useSelector } from 'react-redux';
import './Result.css';
import ResultsLog from './ResultsLog';
import RestartBtn from './RestartBtn';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

function Result() {

    const userAnswers = useSelector((state) => state.userAnswers);
    const username = useSelector((state) => state.username);
    const [result, setResult] = useState('pending');

    useEffect(() => {
        fetch("https://quiz-app-1vbc.onrender.com/api/result", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAnswers)
        }).then((res) => {
            return res.json();
        }).then((json) => {
            if (json.status === 'success') {
                setResult(json.data.result);
            } else {
                setResult(null);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let localStorge = window.localStorage;

    if (result !== null && result !== 'pending') {
        let results = localStorge.getItem('results');
        let currentResult = {...result, username, id: Date.now()};
        if (results) {
            let userResults = JSON.parse(results);
            userResults.push(currentResult);
            localStorge.setItem('results', JSON.stringify(userResults));
        } else {
            localStorge.setItem('results', JSON.stringify([currentResult]));
        }
    }

    if (result === null) {
        return (
            <>
            <h1 className='text-center text-2xl font-bold mb-5'>Back to quiz</h1>
            <RestartBtn text='Restart'/>
            <ResultsLog />
            </>
        )
    }

    return (
        <>
        <div className="result text-lg mb-5">
            <div className="container p-10">
                {result === 'pending' ? (
                    <Loading />
                ): (
                    <>
                    <div className="headers flex justify-between mb-5">
                        Username <span className="username">{username}</span>
                    </div>
                    <div className="stats">
                        <p className="mb-2">Total Quiz Points : <span className="float-right">{result.totalPoints}</span></p>
                        <p className="mb-2">Total Questions : <span className="float-right">{userAnswers.length}</span></p>
                        <p className="mb-2">Total Earned Points : <span className="float-right">{result.userEarnedPoints}</span></p>
                        <p>Quiz Result <span className={`${result.isPassed ? "text-green-500" : "text-red-500"} font-bold float-right`}>
                            {result.isPassed ? 'Passed' : 'Failed'}
                        </span></p>
                    </div>
                    </>
                )}
            </div>
        </div>
        <RestartBtn text='Restart'/>
        <ResultsLog />
        </>
    )
}

export default Result;
