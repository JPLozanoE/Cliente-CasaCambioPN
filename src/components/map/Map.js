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

    const LUGARES=[
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.558249,28.686385]},"properties":{"key":0,"nombre":"Sueño de Luna","categoria":"Cafetería","direccion":63777,"horario":2659,"descripcion":0,"icon":"cafe"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.528700,28.716200]},"properties":{"key":1,"nombre":"Venus Boutique","categoria":"Boutique","direccion":6757,"horario":283,"descripcion":0,"icon":"shop"}},
    
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.522831,28.705997]},"properties":{"key":3,"nombre":"Endohospital","categoria":"Hospital","direccion":6757,"horario":283,"descripcion":0,"icon":"hospital"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.538587,28.698370]},"properties":{"key":4,"nombre":"El Salón by Bettina","categoria":"Belleza","direccion":6757,"horario":283,"descripcion":0,"icon":"triangle"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.525448,28.701794]},"properties":{"key":5,"nombre":"Cielo Rojo","categoria":"Cafetería","direccion":6757,"horario":283,"descripcion":0,"icon":"cafe"}},
        {"type":"Feature","geometry":{"type":"Point","coordinates":[-100.535448,28.701794]},"properties":{"key":6,"nombre":"Cielo Verde","categoria":"Cafetería","direccion":6757,"horario":283,"descripcion":0,"icon":"cafe"}}
    ];

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
            style: 'mapbox://styles/mapbox/light-v8',
            center: [lng, lat],
            zoom: zoom
            });

            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });

            // NUEVAS COSAS
            var nav = new mapboxgl.NavigationControl();
            map.current.addControl(nav,'bottom-right');
    
            map.current.once('load', function () {
                // console.log(Lugares1);
                  map.current.addSource('points', {
                      type: 'geojson',
                      data: {
                          type: 'FeatureCollection',
                          features: LUGARES
                      }
                  });
    
                  map.current.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                    'icon-image': '{icon}-15',
                    'icon-allow-overlap': true
                    }
                    });
                    
                  const popup = new mapboxgl.Popup({
                      closeButton: false,
                      closeOnClick: false
                  });
    
                  let previous_id;
    
                  map.current.on('mousemove', 'points', (e) => {
                      const key = e.features[0].properties.key;
                      if (key !== previous_id) {
                          const { nombre, direccion, horario, descripcion } = e.features[0].properties;
                          map.current.getCanvas().style.cursor = 'pointer';
    
                          const coordinates = e.features[0].geometry.coordinates.slice();
                          const HTML = `<html> <style type="text/css"> @import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto:ital,wght@0,400;0,500;1,300&display=swap'); body { font-family: 'Roboto', sans-serif; font-family: 'Lato', sans-serif; } .header-title { font-family: 'Roboto', sans-serif; font-family: 'Lato', sans-serif; font-size: 15px; font-weight: bold; color: #000000; } .flex-container { height: 30px; display: flex; flex-wrap: nowrap; } .dot-container { width: 20px; height: 30px; display: flex; justify-content: center; align-items: center; } .title-container { width: 95px; height: 30px; display: flex; align-items: center; } .statistics-container { width: 80px; height: 30px; display: flex; justify-content: flex-end; align-items: center; } .confirmed-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #DA1400; } .deaths-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #525252; } .recovered-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #3BD202; } .statistics-label { font-family: 'Roboto', sans-serif; font-size: 12px; } .statistics-count { font-family: 'Roboto', sans-serif; font-size: 12px; } </style> <body> <table cellpadding=0 cellspacing=0 border="0" width="200" height="40"> <tr> <td align="center" "> <span class=" header-title ">${nombre}</span> </td> </tr> </table> <table cellpadding=0 cellspacing=0 border="0" width="200" height="90"> <tr> <td align="center" class="flex-container"> <div class="dot-container"><div class="confirmed-dot"></div></div> <div class="title-container"><span class="statistics-label">Confirmed</span></div> <div class="statistics-container"><span class="statistics-count">${direccion}</span></div> </td> </tr> <tr> <td align="center" class="flex-container"> <div class="dot-container"><div class="deaths-dot"></div></div> <div class="title-container"><span class="statistics-label">Deaths</span></div> <div class="statistics-container"><span class="statistics-count">${horario}</span></div> </td> </tr> <tr> <td align="center" class="flex-container"> <div class="dot-container"><div class="recovered-dot"></div></div> <div class="title-container"><span class="statistics-label">Recovered</span></div> <div class="statistics-container"><span class="statistics-count">${descripcion}</span></div> </td> </tr> </table> </body> </html>`;
    
                          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                          }
                          popup.setLngLat(coordinates).setHTML(HTML).addTo(map.current);
                      }
                  });
    
                  map.current.on('click','points',(e)=>{ 
                    alert('le hiciste click');
                  });
    
                  map.current.on('mouseleave', 'points', function () {
                      previous_id = undefined;
                      map.current.getCanvas().style.cursor = '';
                      popup.remove();
                  });
              })
            // NUEVAS COSAS


            });

            
    
            // useEffect(() => {

            //     });
        // SETTINGS PARA EL MAPA

    return (
        <div ref={mapContainer} className={classes.map} />
    )
}
