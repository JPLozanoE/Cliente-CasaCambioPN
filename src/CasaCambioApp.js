import React from 'react'
import { AppRouter } from './routers/AppRouter';
import {Helmet} from 'react-helmet'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#2a9cf4',
            light: '#77c0f8',
            dark: '#0a72c2'
        },
        secondary: {
          main: '#F5A42A',
        },
        text:{
            primary:'#010b13'
        },
        background:{
            paper:'#ecf6fe'
        }
      },
    typography:{
        fontFamily:'Montserrat',
        fontWeightLight:300,
        fontWeightRegular:400,
        fontWeightMedium:500,
        fontWeightBold:600,
      }
    }
);
export const CasaCambioApp = () => {


    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <link 
                    rel="preconnect" 
                    href="https://fonts.gstatic.com"/>
                <link 
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
                <script 
                    src='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js'></script>
                <link 
                    href='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css' rel='stylesheet' />
            </Helmet>
        <AppRouter/>
        </ThemeProvider>
    )
}
