import { Link as RouterLink } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';

import { greenIcon, redIcon, goldIcon } from "./MapIcons";

const Map = ({ data }) => {
  function SetViewOnClick() {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }

  return (
    <div>
      <MapContainer
        style={{ height: "93.2vh", width: "100%", zIndex: 0 }}
        center={[27.7172, 85.324]}
        zoom={13}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        />
        {data.map((info, index) => (
          <Marker
            key={index}
            position={info.location}
            icon={
              info.type === "religious" ? redIcon
                : info.type === "landmark" ? greenIcon
                : goldIcon
            }
          >
            <Popup>
              <Box style={{ width: "275px", height: "auto" }}>
                <Typography variant="h4">{info.name}</Typography>
                <Typography variant="h6" color="grey">{info.type.charAt(0).toUpperCase() + info.type.slice(1)}</Typography>
                <img
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    minHeight: "225px",
                    objectFit: "cover",
                  }}
                  src={info.image}
                  alt={info.name}
                />
                <Typography variant="body2">{ReactHtmlParser(info.description.slice(0, 150).concat("..."))}</Typography>
                <Typography>
                  <Link component={RouterLink} to={`/place/${info.id}`}>
                    View
                  </Link>
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick />
      </MapContainer>
    </div>
  );
};

export default Map;
