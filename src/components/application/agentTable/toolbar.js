import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React,{useState,useRef,useCallback} from 'react';
import ReactButton from '../button/button'
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import {useSelector} from "react-redux";
import AgentAdd from '../../../views/app/application/agent/addAgent';
import '../../../App.css'


//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
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
    const bybId = useSelector(state => state.bybId);

  const handleOpen = () => {
    setOpen(true);
  };

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

      <section style={{background:'#ffffff',width:'100%',height:'100%'}}    
      
      className={isScrollable ? " scrollable" : ""}
    >


      <p onClick={handleClose} style={{fontSize:40,textAlign:'right',cursor:'pointer',padding:'0 30px',margin:0}}>x</p>
        <AgentAdd closeModal={handleClose} ref={(element) => {
        if (!element) return;
        setContainer(element);
        const { clientWidth, scrollWidth } = element;
        console.log(clientWidth,scrollWidth)
        setIsScrollable(scrollWidth > clientWidth);
      }}/>
        <div className={"scrollarrow" + (isScrollable ? " scrollable" : "")}>hello</div>

      </section>

      </Grow>
      </Modal>
      </>
    );
  };

  export default EnhancedTableToolbar;