import React from 'react'
import { Drawer, Typography, ListItem, ListItemIcon, ListItemText, makeStyles, Divider, useTheme } from '@material-ui/core';

const drawerWidth=240;

const useStyles=makeStyles((theme)=>{
    return{
        active:{
            background:'#f4f4f4'
        },
        title:{
            padding:theme.spacing(2)
        },
        drawerPaper:{
            width:drawerWidth
        }
    }
});

export const DrawerCasas = (props) => {
    const theme = useTheme();
    const classes=useStyles();
    const {desktop,handleDrawerToggle,menuItems,mobileOpen} = props;
    const container = desktop ? props.container : undefined;
    console.log(props);
    return (

            <Drawer
            container={(!desktop) ? container : undefined }
            anchor={(!desktop) ?  `${theme.direction === 'rtl' ? 'right' : 'left'}` : undefined  }
            onClose={(!desktop) ? handleDrawerToggle : undefined }
            ModalProps={(!desktop) ? {
              keepMounted: true, // Better open performance on mobile.
            } : undefined}

            variant={(desktop) ? `permanent` : `temporary`}
            classes={{paper:classes.drawerPaper}}
            open={(!desktop) ? mobileOpen : undefined}
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
                >
                    <ListItemText primary='El porvenir' secondary={<React.Fragment><strong>Compra</strong> <span style={{color:'green'}}>18.50</span> <strong>Venta</strong> <span style={{color:'red'}}>19.90</span> </React.Fragment>} />
                </ListItem> 
            </div>
            ))}
        </Drawer>
    )
}
