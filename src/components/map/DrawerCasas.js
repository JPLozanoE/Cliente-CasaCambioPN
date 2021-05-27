import React from 'react'
import { Drawer, Typography, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';



const drawerWidth='240px';

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

export const DrawerCasas = (props) => {
    const classes=useStyles();
    console.log(props.menuItems);
    return (

            <Drawer
            // className={props.classes.drawer}
            container={props.container}
            variant="temporary"
            // anchor="left"
            classes={{paper:classes.drawerPaper}}
            anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
        >

            <div>
                <Typography variant="h5" className={classes.title}>
                    Notas
                </Typography>
            </div>
            {props.menuItems.map(item=>(
                <ListItem 
                    key={item.text}
                    button
                    onClick={()=>props.history.push(item.path)}
                    className={props.location.pathname===item.path ? classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </Drawer>
    )
}
