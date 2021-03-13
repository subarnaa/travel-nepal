import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  useMap,
} from "react-leaflet";

const ContributeMap = ({ setValues, values, location, setLocation }) => {
  useEffect(() => {
    setValues({ ...values, location: location });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function LocationMarker() {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);
    });

    return <Marker position={location}></Marker>;
  }

  function SetViewOnClick() {
    const map = useMap();

    useEffect(() => {
      map.setView({ lat: location[0], lng: location[1] }, map.getZoom(), {
        animate: true,
      });
    }, [map]);

    return null;
  }

  return (
    <div>
      <MapContainer
        style={{ height: "50vh", width: "100%" }}
        center={location}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        />
        <LocationMarker />
        <SetViewOnClick />
      </MapContainer>
    </div>
  );
};

export default ContributeMap;
