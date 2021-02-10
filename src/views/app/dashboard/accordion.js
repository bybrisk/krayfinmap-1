import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RoomIcon from '@material-ui/icons/Room';
import PieChartIcon from '@material-ui/icons/PieChart';
import {NavLink} from 'react-router-dom'
import 'App.css'
const MenuItem = [
  {id:1,label:'Dashboard',link:'/dashboard/clusterMap',icon:<RoomIcon />},
  {id:2,label:'Agents',link:'/dashboard/agents',icon:<PeopleIcon />},
  {id:3,label:'Delivery',link:'/dashboard/deliveries',icon:<ShoppingCartIcon />},
  {id:4,label:'Cluster',link:'/dashboard/clusters',icon:<PieChartIcon />}


]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background:'rgb(255, 255, 255)'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordiondetail:{
    padding:0
  },
  body:{
    padding:'8px 16px 0'
  }
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <List>
      {  MenuItem.map((item, index) => (
         <NavLink to={item.link} activeClassName="link-active"> 
         <ListItem component={NavLink} button key={item.id} to={item.link} activeClassName="link-active" style={{background:"inherit",textDecoration:'none',color:'#000000'}}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem></NavLink>
        ))}
    
      </List>

    
    </div>
  );
}
