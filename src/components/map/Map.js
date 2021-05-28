import React, { useEffect, useRef, useState } from 'react'
import './map.css'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { makeStyles } from '@material-ui/core';

mapboxgl.accessToken = 'pk.eyJ1IjoianBsb3phbm9lIiwiYSI6ImNrOWlyZHFoejAzNTUzbnFibmtjOHltazUifQ.VxOAhucj7_yCGFiEK1wzMg';


const useStyles=makeStyles((theme)=>{
        return{
        map:{
            width:'100%',
            height:'100%'
        }
    }
});

export const Map = () => {
    const classes=useStyles();
    
        // SETTINGS PARA EL MAPA
        const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-100.5178);
        const [lat, setLat] = useState(28.69);
        const [zoom, setZoom] = useState(13.44);
    
        
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
        // SETTINGS PARA EL MAPA
        
    return (
        <div ref={mapContainer} className={classes.map} />
    )
}
