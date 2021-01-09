import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
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
import PieChartIcon from '@material-ui/icons/PieChart';
import {NavLink} from 'react-router-dom'
import '../../../App.css'
const MenuItem = [
  {id:1,label:'Agents',link:'/dashboard/agents',icon:<PeopleIcon />},
  {id:2,label:'Delivery',link:'/dashboard/deliveries',icon:<ShoppingCartIcon />},
  {id:3,label:'Cluster',link:'/dashboard/clusters',icon:<PieChartIcon />}


]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background:'#142245'
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
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Dashboard</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordiondetail}>
          <Typography variant="body1" className={classes.body}>Menu</Typography>
        <List>
      {  MenuItem.map((item, index) => (
         <NavLink to={item.link} activeClassName="link-active"> <ListItem button key={item.id} style={{background:"inherit",textDecoration:'none',color:'#ffffff'}}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem></NavLink>
        ))}
      </List>
     
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
