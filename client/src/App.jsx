import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Questions from './components/Questions';
import Result from './components/Result';

function App() {

    return (
        <div className='main-page min-h-screen main-bg-color flex flex-col items-center'>
            <div className='container items-center px-5 lg:px-40 py-10'>
            <h1 className='title text-center text-5xl mb-10 p-5 rounded font-bold'>
                Quiz App
            </h1>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/questions' element={<Questions />} />
                    <Route path='/result' element={<Result />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
