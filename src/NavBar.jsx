import React, { useState } from 'react';
import './NavBar.css';

export default function NavBar() {
    const [selectedAlgo, setSelectedAlgo] = useState(null);
    const [animateSelected, setAnimateSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAlgoChange = (value) => {
        setSelectedAlgo(value);
        setErrorMessage(''); // Clear error message when a selection is made
    };

    const handleAnimateChange = () => {
        setAnimateSelected(!animateSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!selectedAlgo) {
            setErrorMessage('Please select an algorithm.');
            return;
        }

        // If validation passes
        console.log('Selected Algorithm:', selectedAlgo);
        console.log('Animate Selected:', animateSelected);
        // Here you can add any logic for handling form submission, like API calls
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
                {/* Submit Button */}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
