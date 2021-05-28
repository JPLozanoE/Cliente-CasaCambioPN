import { Drawer, makeStyles, Typography, List,ListItem,ListItemIcon,ListItemText, AppBar, Toolbar, Avatar, useTheme, CssBaseline, IconButton, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import Divider from '@material-ui/core/Divider';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './map.css'
 
mapboxgl.accessToken = 'pk.eyJ1IjoianBsb3phbm9lIiwiYSI6ImNrOWlyZHFoejAzNTUzbnFibmtjOHltazUifQ.VxOAhucj7_yCGFiEK1wzMg';

const drawerWidth=240;

const useStyles=makeStyles((theme)=>{
    return{
        root:{
            display:'flex'
        },
        drawer:{
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar:{
            [theme.breakpoints.up('sm')]: {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow:1,
            fontWeight:600,
        },
        page:{
            backgroundColor:'#f9f9f9',
            width:'100%',
            // padding:theme.spacing(3)
        },
        drawerPaper:{
            width:drawerWidth
        },
        active:{
            background:'#f4f4f4'
        },
        title:{
            padding:theme.spacing(2)
        },
        avatar:{
            marginLeft:theme.spacing(2)
        },
        mapWrapper:{
            position: 'relative',
            height:`calc(100vh - 64px)`,
            width:'100%'
        },
        map:{
            width:'100%',
            height:'100%'
        }
    }
});

const menuItems=[
    {
    id:1,
    text:'Mis notas',
    icon: <SubjectOutlined color="secondary"/>,
    path: '/'
    },
    {
    id:2,
    text:'Crear nota',
    icon: <AddCircleOutlined color="secondary"/>,
    path: '/create'
    }
]


export const MapScreen = (props) => {
    
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

    const classes=useStyles();
    const theme = useTheme();
    const history=useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { window } = props;
    // Nos sirve para saber en qué página estamos
    const location=useLocation();
    // Nos sirve para saber en qué página estamos
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            className={classes.appBar}
            elevation={0}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon/>
            </IconButton>
                <Typography color="textPrimary" className={classes.date}>
                    CasaCambioPN
                </Typography>

                {/* <Typography>
                    Mario
                </Typography>
                <Avatar src="/mario-av.png" className={classes.avatar}/> */}
            </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
        <Drawer
            // className={classes.drawer}
            container={container}
            variant="temporary"
            // anchor="left"
            classes={{paper:classes.drawerPaper}}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
        >

            <div>
                <Typography variant="h5" className={classes.title}>
                    Casas de Cambio
                </Typography>
            </div>
            {menuItems.map(item=>(
                <ListItem 
                    key={`${item.id}mobile`}
                    button
                    onClick={()=>history.push(item.path)}
                    className={location.pathname==item.path ? classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
        <Drawer
            // className={classes.drawer}
            variant="permanent"
            // anchor="left"
            classes={{paper:classes.drawerPaper}}
            open
        >

            <div>
                <Typography variant="h5" className={classes.title}>
                    Notas
                </Typography>
            </div>
            {menuItems.map(item=>(
            <div
                    key={`${item.id}desktop`}
            >
            <Divider/>
                <ListItem 
                    button
                    onClick={()=>history.push(item.path)}
                    className={location.pathname===item.path ? classes.active : null}
                >
                    {/* <ListItemText primary='El porvenir' secondary="Venta: 18.50 Compra: 19.90" /> */}
                    {/* <ListItemText primary='El porvenir' secondary={<React.Fragment>Compra<strong>special</strong> <ListItemIcon>{item.icon}</ListItemIcon> </React.Fragment>} /> */}
                    <ListItemText primary='El porvenir' secondary={<React.Fragment><strong>Compra</strong> <span style={{color:'green'}}>18.50</span> <strong>Venta</strong> <span style={{color:'red'}}>19.90</span> </React.Fragment>} />
                    {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                    {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                    {/* <ListItemText primary={'Venta'} /> */}

                </ListItem>   
            </div>
            ))}
        </Drawer>
        </Hidden>
        </nav>

        <div className={classes.page}>
        <div className={classes.toolbar}></div>
            <div className={classes.mapWrapper}>
                <div ref={mapContainer} className={classes.map} />
            </div>
        </div>
        </div>
    )
}
