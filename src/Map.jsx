import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import "./Map.css"

export default function MapComponent({ selectedAlgorithm }) {
    const [markers, setMarkers] = useState({
        start: { position: [28.5384, -81.3789], visible: true },
        end: { position: [28.544, -81.320], visible: true }
    });
    const [path, setPath] = useState([]); // Store the path
    const [activeMarker, setActiveMarker] = useState(null);

    const startIcon = new L.Icon({
        iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const endIcon = new L.Icon({
        iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if (activeMarker) {
                    setMarkers(prevMarkers => ({
                        ...prevMarkers,
                        [activeMarker]: { ...prevMarkers[activeMarker], position: [e.latlng.lat, e.latlng.lng], visible: true }
                    }));
                    setActiveMarker(null);
                }
            }
        });
        return null;
    };

    const handleSubmit = async () => {
        if (!markers.start || !markers.end) {
            console.error('Markers are not properly set!');
            return;
        }

        const payload = {
            start: markers.start.position,
            end: markers.end.position,
            algorithm: selectedAlgorithm
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/get_shortest_path', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the path.');
            }

            const result = await response.json();
            setPath(result);

        } catch (error) {
            console.error('Error fetching path:', error);
        }
    };

    useEffect(() => {
        if (selectedAlgorithm || activeMarker) {
            console.log("part2");
            handleSubmit();
        }
    }, [selectedAlgorithm]);

    return (
        <div className='MapBox'>
            <MapContainer
                center={[28.5384, -81.3789]}
                zoom={13}
                minZoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '87%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents />
                {markers.start && markers.start.visible && (
                    <Marker
                        position={markers.start.position}
                        icon={startIcon}
                        eventHandlers={{ click: () => setActiveMarker('start') }}
                    >
                        <Popup>
                            Start Marker <br /> Position: {markers.start.position.join(', ')}
                        </Popup>
                    </Marker>
                )}
                {markers.end && markers.end.visible && (
                    <Marker
                        position={markers.end.position}
                        icon={endIcon}
                        eventHandlers={{ click: () => setActiveMarker('end') }}
                    >
                        <Popup>
                            End Marker <br /> Position: {markers.end.position.join(', ')}
                        </Popup>
                    </Marker>
                )}
                {path.length > 0 && (
                    <Polyline positions={path} color="blue" />
                )}
            </MapContainer>
        </div>
    );
}