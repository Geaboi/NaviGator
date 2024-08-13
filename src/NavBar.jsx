import React, { useState } from 'react';
import './NavBar.css';

export default function NavBar() {
    const [selectedAlgo, setSelectedAlgo] = useState(null);
    const [animateSelected, setAnimateSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAlgoChange = (value) => {
        setSelectedAlgo(value);
        setErrorMessage(''); 
    };

    const handleAnimateChange = () => {
        setAnimateSelected(!animateSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!selectedAlgo) {
            setErrorMessage('Please select an algorithm.');
            return;
        }
        console.log('Selected Algorithm:', selectedAlgo);
        console.log('Animate Selected:', animateSelected);
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
                <label className='options'>
                    Animate
                    <input
                        type='checkbox'
                        name='animate'
                        checked={animateSelected}
                        onChange={handleAnimateChange}
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
