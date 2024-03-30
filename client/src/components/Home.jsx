import './Home.css';
import { rules } from '../assets/rules.js'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserAnswers } from '../rtk/reducers/userAnswers.js';
import { useState } from 'react';
import { saveUsername } from '../rtk/reducers/username.js';

function Home() {

    const [username, setUsername] = useState('Unknown');
    
    let dispatch = useDispatch();

    return (
        <>
        <ul className='rules text-xl mb-12'>
            {rules.map((rule, i) => (
                <li key={i + 1}>{i + 1}: {rule}</li>
            ))}
        </ul>
        <input onChange={(e) => {
            setUsername(e.target.value);
        }} className='username-input mx-auto block mb-8 w-3/4 p-3 rounded outline-none' placeholder='Username' type='text' />
        <Link onClick={() => {
            dispatch(clearUserAnswers())
            dispatch(saveUsername(username));
        }} to={'/questions'} className='start-btn w-fit mx-auto font-bold transition hover:opacity-70 text-white block px-8 py-3 rounded'>Start Quiz</Link>
        </>
    )
}

export default Home;
