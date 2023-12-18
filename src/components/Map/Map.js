import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ destinations }) => {
  return (
    <MapContainer center={[0, 0]} zoom={4} style={{ height: '400px', width: '100%', border: '2px solid #ccc', borderRadius: '8px', marginTop: '20px' ,aspectRatio: '1/1'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {destinations.map((destination) => (
        <Marker
          key={destination.id}
          position={[destination.latitude, destination.longitude]}
        >
          <Popup>{destination.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
