import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ReactButton from '../../CustomComponents/ReactButton/ReactButton'
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';

import AddAgent from '../AddAgent/AddAgent';
import '../../App.css'
//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      padding:'0 30px'
    },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  //thiis is to show "Agent" at top Helps in fixing 
  //them just above table
  const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
      <>
      <Toolbar
        className={classes.root}
      >
       <Typography variant="h5">Agents</Typography>
<ReactButton width={"140px"} className="flex" onClick={handleOpen}>Add Agent <AddIcon style={{fontSize:'25px',marginTop:'4px'}}/></ReactButton>
      </Toolbar>
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

      <section style={{background:'#ffffff',width:'100%',height:'100%'}}> 
      <p onClick={handleClose} style={{fontSize:40,textAlign:'right',cursor:'pointer',padding:'0 30px',margin:0}}>x</p>
        <AddAgent />
      </section>
      </Grow>
      </Modal>
      
      </>
    );
  };

  export default EnhancedTableToolbar;