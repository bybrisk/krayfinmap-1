import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import {useSelector} from 'react-redux'
import Logo from 'Assets/logoWhite.png';
// import AgentTable from '../AgentTable/AgentTable'
// import DeliveryTable from '../AgentTable/DeliveryTable/DeliveryTable'
import Accordion from './accordion';
import Dropdown from './AccountDropdown';
import { Dashboard } from './router';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    
    [theme.breakpoints.up('md')]: {
      width: "100%",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {...theme.mixins.toolbar,
     [theme.breakpoints.up('md')]: {
      display:'none',
    },
  
  },
  toolbar2:theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top:0,
    [theme.breakpoints.up('md')]: {
      top:64,
    },

  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    width:"100%"
  },
}));

function ResponsiveDrawer(props) {
  const { window} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
const user = useSelector(state => state.user)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>

      <div className={classes.toolbar}>
      <div style={{background:'#ffffff',width:'100%',height:64,display:'flex',justifyContent:'center'}}>
          <img src={Logo} style={{height:'inherit'}} alt="Krayfin Map" />
          <Divider style={{background:'#000000'}}/>

          </div>

      </div>
      <List>

      <div style={{textAlign:'left',padding:10,color:"#000000"}}><Typography variant="h6">Hi, {user.UserName} </Typography></div>
      <Divider style={{background:'#000000'}}/>
      <Accordion/>
      <Divider style={{background:'#000000'}}/>

     
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>

      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar style={{background:'#1A73E8',justifyContent:'space-between'}}>
         <div style={{display:'flex'}}>
          
          <div style={{marginRight:10,marginLeft:10}}>
          <img src={Logo} style={{maxHeight:60}} alt="Krayfin Map"/>

          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
         
          </div>
          <div style={{width: 50,
    minHeight: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
            <Dropdown/>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Drawer">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar2} />

<Dashboard {...props}/>
        </main>
        </BrowserRouter>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
