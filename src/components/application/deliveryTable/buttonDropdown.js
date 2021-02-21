import React, { useRef, useEffect,useState, Suspense} from "react";
import Avatar from '@material-ui/core/Avatar'
import 'views/app/dashboard/dropdown.css'
import { fade, makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import AddIcon from "@material-ui/icons/Add";
import ReactButton from "../button/button";
import Loader from '../Loader/Loader'
const AddDelivery = React.lazy(() =>
  import(/* webpackChunkName: "Add-delivery" */ 'views/app/application/delivery/addDeivery')
);
const AddMultiple = React.lazy(() =>
  import(/* webpackChunkName: "Add - Multiple" */ './AddMultiple')
);

const useToolbarStyles = makeStyles((theme) => ({
    reactbutton:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      divSettler:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300
      },
      dropdown:{
          border:".7px solid rgb(6, 19, 54)",
          color:'rgb(6, 19, 54)' ,
          padding:"5px !important"
      }
}))
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(props) {
  const {wrapperRef,setOpen} = props;
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
              setOpen(false);            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef,setOpen]);
}


/**
 * Component that alerts if you click outside of it
 */
export default function ButtonDropdown() {
  const wrapperRef = useRef(null);
  const [open, OpenModal] = useState(false);
  const [link,setLink] = useState('');
  const classes = useToolbarStyles();

  const handleOpen = (query) => {
    setLink(query);
    OpenModal(true);
  };
  const handleClose = () => {
    OpenModal(false);
  };

  const setOpen = (props) =>{
props===true?wrapperRef.current.classList.add("active"):wrapperRef.current.classList.remove("active")
    
  }

  const logOut = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('bybid')
        
  }


    useOutsideAlerter({wrapperRef,setOpen});

    return (
      <div className={classes.divSettler}>
     <Suspense fallback={<Loader/>}>
        <div className="right">
              <div className="dropdowncont" ref={wrapperRef}>
                <span className="profile-image">
                <ReactButton
            width={"140px"}
            padding={'.5rem'}
            style={{
            }}
            className={classes.reactbutton}
            onClick={()=>setOpen(true)}
          >
            Add Delivery <AddIcon style={{ fontSize: "25px", marginTop: "4px" }} />
          </ReactButton>

                </span>
                 
                <div className={[`dropdown ${classes.dropdown}`]} >
                <List component="nav" aria-label="Add Delivery">
                <ListItem onClick={()=>handleOpen('Add Single')} button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemText primary="Add Single" />
        </ListItem>
        <Divider />

        <ListItem onClick={()=>handleOpen('Add Multiple')} button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemText primary="Add Multiple" />
        </ListItem>

                </List>
                </div>
                
              </div>
        </div>
        <Modal
         open={open}
        onClose={handleClose}
        aria-labelledby={link}
        aria-describedby={link}
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
<div style={{fontSize:40,textAlign:'right',padding:'0 30px',margin:0}}>    <span style={{cursor:'pointer'}} onClick={handleClose} >x</span>
</div>
{link==='Add Single'?<AddDelivery closeModal={handleClose} />:<AddMultiple closeModal={handleClose} isOpen={open}/>}
</section>
</Grow>

        </Modal>
     </Suspense>
        </div>
        )

    ;
}