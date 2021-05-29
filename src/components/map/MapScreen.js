import { Drawer, makeStyles, Typography, List,ListItem,ListItemIcon,ListItemText, AppBar, Toolbar, Avatar, useTheme, CssBaseline, IconButton, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import Divider from '@material-ui/core/Divider';
import { Map } from './Map';
import { DrawerCasas } from './DrawerCasas';
 

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
    


    const classes=useStyles();
    const theme = useTheme();
    const history=useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    const { window } = props;
    // Nos sirve para saber en qué página estamos
    const location=useLocation();
    // Nos sirve para saber en qué página estamos

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
        <DrawerCasas
            desktop={false}

            container={container}
            handleDrawerToggle={handleDrawerToggle}
            menuItems={menuItems}
            mobileOpen={mobileOpen}

        />
        </Hidden>

        <Hidden xsDown implementation="css">
        <DrawerCasas
            classes={classes}
            theme={theme}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            menuItems={menuItems}
            desktop={true}
        />
        </Hidden>
        </nav>

        <div className={classes.page}>
        <div className={classes.toolbar}></div>
            <div className={classes.mapWrapper}>
                <Map/>
            </div>
        </div>
        </div>
    )
}
