import React from 'react';
import './Map.css'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map() {
  const floridaBounds = [
    [31.0000, -87.6349],
    [24.3963, -80.0314]
  ];

  return (
    <div className='MapBox'>
      <MapContainer
        center={[28.5384, -81.3789]}
        zoom={13}
        minZoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '87%' }}
        maxBounds={floridaBounds}
        maxBoundsViscosity={1.0} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.5384, -81.3789]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
