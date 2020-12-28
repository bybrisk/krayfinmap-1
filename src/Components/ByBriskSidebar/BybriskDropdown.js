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
const MenuItem = [
  {id:1,label:'Agents',link:'',icon:<PeopleIcon />},
  {id:2,label:'Delivery',link:'',icon:<ShoppingCartIcon />},
  {id:3,label:'Cluster',link:'',icon:<PieChartIcon />}


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
        <AccordionDetails>
          <Typography variant="body1">Menu</Typography>
        <List>
      {  MenuItem.map((item, index) => (
          <ListItem button key={item.id}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
     
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
