import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ArrowRight, MapPin } from 'lucide-react';

// Create custom colored DivIcon markers for category types
const createMapPinIcon = (category, status) => {
  let color = '#38bdf8'; // Default cyan
  if (category === 'Roads') color = '#f59e0b';
  if (category === 'Sanitation') color = '#10b981';
  if (category === 'Water') color = '#a855f7';

  const html = `
    <div style="
      background-color: ${color};
      width: 34px;
      height: 34px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.6);
      border: 2px solid #ffffff;
    ">
      <div style="
        transform: rotate(45deg);
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
      ">•</div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: html,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34]
  });
};

export default function MapView({ issues, height = '450px' }) {
  const navigate = useNavigate();
  const defaultCenter = [37.7749, -122.4194];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-0" style={{ height }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.coordinates.lat, issue.coordinates.lng]}
            icon={createMapPinIcon(issue.category, issue.status)}
          >
            <Popup>
              <div className="p-2 w-56 font-sans">
                {issue.image && (
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                )}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-200">{issue.category}</span>
                  <span>•</span>
                  <span>{issue.status}</span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mb-1 leading-tight">{issue.title}</h4>
                <p className="text-xs text-neutral-600 mb-2 truncate">📍 {issue.location}</p>
                
                <button
                  onClick={() => navigate(`/issue/${issue.id}`)}
                  className="w-full py-1.5 rounded-md bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
