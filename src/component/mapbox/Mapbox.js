import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors.js";
import useGeolocation from "./useGeolocation";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXlydGlsbGVraW0iLCJhIjoiY2xndXplYW16MDEydjNncXlnd2JlNjRhZSJ9.CvoGmy7XlQDJvy7AjgC5SQ";

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const location = useGeolocation();
  const [lat, setLat] = useState(10.195468191473573);
  const [lng, setLng] = useState(106.2192260145036);
  // const [lat, setLat] = useState(location.coordinate.lat);
  // const [lng, setLng] = useState(location.coordinate.lng);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    new mapboxgl.Marker({
      color: `${Colors.textPrimary}`,
      draggable: true,
    })
      .setLngLat([106.5937773, 10.1111313])
      .addTo(map.current);
    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
  });

  return (
    <div>
      <div className="map-box">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Mapbox;
