import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from "@material-ui/core/Modal";
import Loader from 'components/application/Loader/Loader'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, { useRef, useState, Suspense } from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from 'react-redux';
import 'App.css';
import ReactButton from '../button/button';
const AgentAdd = React.lazy(() =>
  import(/* webpackChunkName: "Agent-add" */ 'views/app/application/agent/addAgent')
);

//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',

    },
    root1:{
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',

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

  const handleOpen = () => {
    setOpen(true);
  };

  const Bybid = useSelector(state=>state.bybId)

  const handleClose = (newprops) => {
    setOpen(false);
    if(newprops.makeRequest){
      props.handleAgent();
    }
  };
  const [isScrollable, setIsScrollable] = useState(false);
  const [container, setContainer] = useState(null);
  // this has to be done by ref so when window event resize listener will trigger - we will get the current element
  const containerRef = useRef(container);
  containerRef.current = container;
  

    return (
      <>
      <Toolbar
        className={classes.root}
      >
   
      <Typography variant="h5">Agents</Typography>
<ReactButton width={"140px"} height={'56px'} padding={'.5rem'} className="flex" onClick={handleOpen}>Add Agent <AddIcon style={{fontSize:'25px',marginTop:'4px'}}/></ReactButton>
    
      </Toolbar>
 <div className={classes.root1}>
      <Grid item xs={12} md={10} container justify="flex-start" style={{marginBottom:20}}>
        <Grid item xs={12} md={2} lg={2} container alignItems="center">
          <Typography variant="h6">Business Id :</Typography>
        </Grid>
        <Grid container xs={12} md={8} alignItems="center">
          <Typography variant="h5" component="h5">{Bybid}</Typography>
        </Grid>
      </Grid>
</div>
   <Suspense fallback={<Loader/>}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add-Agent"
        aria-describedby="Add-Agent"
        closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 400,
                }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:'column',
          background:'#ffffff'
        }}
      >
                            <Grow in={open} timeout={250}>
      <section style={{background:'#ffffff',width:'100%',height:'100%'}}    
      
      className={isScrollable ? " scrollable" : ""}
    >


<div style={{fontSize:40,textAlign:'right',padding:'0 30px',margin:0}}>    <span style={{cursor:'pointer'}} onClick={handleClose} >x</span>
</div>        <AgentAdd closeModal={handleClose} ref={(element) => {
        if (!element) return;
        setContainer(element);
        const { clientWidth, scrollWidth } = element;
        setIsScrollable(scrollWidth > clientWidth);
      }}/>

      </section>
      </Grow>
      </Modal>
      </Suspense> </>
    );
  };

  export default EnhancedTableToolbar;