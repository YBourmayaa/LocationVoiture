import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const position = [33.5731, -7.6355];

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map() {
  return (
    <div className="overflow-hidden border border-white/10 bg-black p-2 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
      <MapContainer center={position} zoom={14} scrollWheelZoom={false} className="h-[360px] w-full md:h-[440px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <strong>Pôle Car</strong>
            <br />
            Car Rental Agency
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
