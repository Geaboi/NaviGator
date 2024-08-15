import React, { useState, useContext } from 'react';
import './NavBar.css';
import { DataContext } from './App';

export default function NavBar() {
    const [selectedAlgo, setSelectedAlgo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { setData } = useContext(DataContext);

    const handleAlgoChange = (value) => {
        setSelectedAlgo(value);
        setErrorMessage(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!selectedAlgo) {
            setErrorMessage('Please select an algorithm.');
            return;
        }

        console.log('Selected Algorithm:', selectedAlgo);

    
        setData(selectedAlgo);
    };


    return (
        <div className='bar'>
            <h1 className='Title'>NaviGator</h1>
            <form onSubmit={handleSubmit}>
                <label className='options'>
                    Dijkstra's Algorithm
                    <input
                        type='radio'
                        name='algo'
                        value='dijkstra'
                        checked={selectedAlgo === 'dijkstra'}
                        onChange={() => handleAlgoChange('dijkstra')}
                        required
                    />
                </label>
                <label className='options'>
                    A* Algorithm
                    <input
                        type='radio'
                        name='algo'
                        value='aStar'
                        checked={selectedAlgo === 'aStar'}
                        onChange={() => handleAlgoChange('aStar')}
                    />
                </label>
                {errorMessage && <p className='error'>{errorMessage}</p>}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
