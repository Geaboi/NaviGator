import React, { useState, useContext } from 'react';
import './NavBar.css';

export default function NavBar({ onAlgorithmSubmit }) {
    const [selectedAlgo, setSelectedAlgo] = useState('dijkstra');
    const [errorMessage, setErrorMessage] = useState('');

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
        console.log("submission");
        onAlgorithmSubmit(selectedAlgo);
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
                        value='a_star'
                        checked={selectedAlgo === 'a_star'}
                        onChange={() => handleAlgoChange('a_star')}
                    />
                </label>
                {errorMessage && <p className='error'>{errorMessage}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}