import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, { useRef, useState, Suspense } from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from 'react-redux';
import 'App.css';
import { Button } from '@material-ui/core';

//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        flexDirection:'column',
        alignItems: "flex-start",
      
        }
  
    },
    root1:{
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',

    },
    btn:{
      maxWidth:220,
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
      border: 'none',
      outline: "none",
      height: 49,
      borderRadius: 49,
      color: "#fff",
      textTransform: "uppercase",
      fontWeight: "600",
      margin: "10px 0",
      cursor: "pointer",
      transition: "0.5s",
    '&:hover':{
      backgroundColor: theme.palette.secondary.light,

    },
    [theme.breakpoints.down("sm")]:{
      maxWidth: 180,
  height:42
    }
    },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  //thiis is to show "Agent" at top Helps in fixing 
  //them just above table
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const [open, setOpen] = React.useState(false);


  // this has to be done by ref so when window event resize listener will trigger - we will get the current element
  

    return (
      <>
      <Toolbar
        className={classes.root}
      >
   
      <Typography variant="h5">Failed Deliveries</Typography>
      <Button variant="contained"
                                disableFocusRipple={true}
                                disableElevation={true}
        
         color="primary" className={classes.btn}>Download as Excel <AddIcon style={{fontSize:'25px',marginTop:'4px'}}/></Button>
    
      </Toolbar>
 {/* <div className={classes.root1}>
      <Grid item xs={12} md={10} container justify="flex-start" style={{marginBottom:20}}>
        <Grid item xs={12} md={2} lg={2} container alignItems="center">
          <Typography variant="h6">center_id :</Typography>
        </Grid>
        <Grid container xs={12} md={8} alignItems="center">
          <Typography variant="h5" component="h5">{supervisor_id}</Typography>
        </Grid>
      </Grid>
</div> */}
 </>
    );
  };

  export default EnhancedTableToolbar;