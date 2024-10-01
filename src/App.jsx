import React, { useState } from 'react';
import NavBar from './NavBar';
import MapComponent from './Map';

export default function App() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');

    const handleAlgorithmSubmit = (algorithm) => {
        setSelectedAlgorithm(algorithm);
    };

    return (
        <div className="App">
            <NavBar onAlgorithmSubmit={handleAlgorithmSubmit} />
            <MapComponent selectedAlgorithm={selectedAlgorithm} />
        </div>
    );
}