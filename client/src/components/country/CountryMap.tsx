import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getMapBounds, calculateMapCenter } from '../../utils/mapUtils';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface CountryMapProps {
  position: [number, number] | [number, number][];
  countryName: string | string[];
  zoom?: number;
}

const CountryMap: React.FC<CountryMapProps> = ({ 
  position, 
  countryName,
  zoom = 5 
}) => {
  const isMultiple = Array.isArray(position[0]);
  const positions = isMultiple 
    ? position as [number, number][] 
    : [position as [number, number]];
  
  const names = Array.isArray(countryName) 
    ? countryName 
    : [countryName];
  
  const bounds = getMapBounds(positions);
  const center = calculateMapCenter(positions);

  return (
    <MapContainer 
      center={center} 
      zoom={zoom}
      bounds={isMultiple ? bounds : undefined}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {positions.map((pos, index) => (
        <Marker key={index} position={pos}>
          <Popup>{names[index]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CountryMap;