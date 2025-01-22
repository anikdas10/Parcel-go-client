import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Map = ({ latitude, longitude, address }) => {
  console.log(latitude, longitude);
  const position = [parseFloat(latitude), parseFloat(longitude)];
  return (
    <div>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "300px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
