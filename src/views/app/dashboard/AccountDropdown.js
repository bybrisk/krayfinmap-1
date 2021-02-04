import React, { useRef, useEffect,useState} from "react";
import Avatar from '@material-ui/core/Avatar'
import './dropdown.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import {useHistory} from 'react-router-dom'
import ForgotPassword from 'views/user/forgot-password'
import UpdateAccount from 'views/user/modify-account'
import {logout} from 'helpers/NetworkRequest'
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
export default function AccountDropdown() {
const history = useHistory();
  const wrapperRef = useRef(null);
  const [open, OpenModal] = useState(false);
  const [link,setLink] = useState('');

  const handleOpen = (query) => {
    setLink(query);
    OpenModal(true);
  };
  const handleClose = () => {
    OpenModal(false);
  };

  const setOpen = (props) =>{
props===true?wrapperRef.current.classList.toggle("active"):wrapperRef.current.classList.remove("active")
    
  }

  const logOut = () =>{
logout(history)        
  }


    useOutsideAlerter({wrapperRef,setOpen});

    return (
      <>
        <div className="right">
              <div className="dropdowncont" ref={wrapperRef}>
                <span className="profile-image">
<Avatar onClick={()=>setOpen(true)} alt={"profile"}/>
                </span>
                 
                <div className="dropdown" >
                <List component="nav" aria-label="Account Setting">
                <ListItem onClick={()=>handleOpen('Change Password')} button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemIcon style={{color:'rgb(6, 19, 54)'}}>
            <LockOpenIcon style={{fontSize:"2rem"}}/>
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />

        <ListItem onClick={()=>handleOpen('Update Account')} button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemIcon style={{color:'rgb(6, 19, 54)'}} >
            <AccountCircleIcon style={{fontSize:"2rem"}}/>
          </ListItemIcon>
          <ListItemText primary="Update Account" />
        </ListItem>
        <Divider />

        <ListItem onClick={logOut} button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemIcon style={{color:'rgb(6, 19, 54)'}} >
            <ExitToAppIcon style={{fontSize:"2rem"}}/>
          </ListItemIcon>
          <ListItemText primary="Log Out" onClick={logOut} />
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
{link==='Change Password'?<ForgotPassword close={handleClose} />:<UpdateAccount close={handleClose}/>}
</section>
</Grow>

        </Modal>
        </>
        )

    ;
}