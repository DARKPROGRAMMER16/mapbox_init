import React, { Fragment,useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyazE2IiwiYSI6ImNreXNjeW5peDBsZm4ycXMwMndheG4zeHIifQ.izA6atCU_0mQxQmtlAvcMg';

const Mbpx = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(78.9629);
    const [lat, setLat] = useState(20.5937);
    const [zoom, setZoom] = useState(2.5);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

  return (
      <Fragment>
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="map-container" />
            </div>
      </Fragment>
  );
};

export default Mbpx;
