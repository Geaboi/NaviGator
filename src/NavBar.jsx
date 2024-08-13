import { useState } from 'react';
import './NavBar.css';

export default function NavBar() {
    const [selectedAlgo, setSelectedAlgo] = useState(null);
    const [animateSelected, setAnimateSelected] = useState(false);

    const handleAlgoChange = (value) => {
        setSelectedAlgo(value);
    };

    const handleAnimateChange = () => {
        setAnimateSelected(!animateSelected);
    };

    const handleSubmit = () => {
        console.log('Selected Algorithm:', selectedAlgo);
        console.log('Animate Selected:', animateSelected);
        // Here you can add any logic for handling form submission, like API calls
    };

    return (
        <div className='bar'>
            <h1 className='Title'>NaviGator</h1>
            <form>
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
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
