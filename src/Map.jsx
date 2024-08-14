import React, { useState } from 'react';
import './Map.css'; 
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; 

export default function Map() {
  const orlandoBounds = [
    [28.6360, -81.5854],
    [28.3852, -81.2150]
  ];

  
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


  const [markers, setMarkers] = useState({
    start: { position: [28.5384, -81.3789], visible: true },
    end: { position: [28.544,-81.320], visible: true }
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (activeMarker) {
          
          setMarkers({
            ...markers,
            [activeMarker]: { ...markers[activeMarker], position: [e.latlng.lat, e.latlng.lng], visible: true }
          });
          setActiveMarker(null); 
        }
      },
      contextmenu(e) {
        
        setMarkers({
          ...markers,
          start: markers.start.position[0] === e.latlng.lat && markers.start.position[1] === e.latlng.lng
            ? { ...markers.start, visible: false }
            : markers.start,
          end: markers.end.position[0] === e.latlng.lat && markers.end.position[1] === e.latlng.lng
            ? { ...markers.end, visible: false }
            : markers.end
        });
      }
    });
    return null;
  };

  const formatPosition = (position) => {
    return `Latitude: ${position[0].toFixed(3)}, Longitude: ${position[1].toFixed(3)}`;
  };

  return (
    <div className='MapBox'>

      <MapContainer
        center={[28.5384, -81.3789]}
        zoom={13}
        minZoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '87%' }}
        maxBounds={orlandoBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents /> {}
        {markers.start.visible && (
          <Marker
            position={markers.start.position}
            icon={startIcon} 
            eventHandlers={{ click: () => setActiveMarker('start') }}
          >
            <Popup>
              Start Marker <br /> Position: {formatPosition(markers.start.position)}
            </Popup>
          </Marker>
        )}
        {markers.end.visible && (
          <Marker
            position={markers.end.position}
            icon={endIcon} 
            eventHandlers={{ click: () => setActiveMarker('end') }}
          >
            <Popup>
              End Marker <br /> Position: {formatPosition(markers.end.position)}
            </Popup>
          </Marker>
        )}
      </MapContainer>

    </div>
  );
}
