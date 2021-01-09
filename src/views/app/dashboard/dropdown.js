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
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(props) {
  const {wrapperRef,setOpen} = props;
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        console.log(wrapperRef)
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
    }, [wrapperRef]);
}


/**
 * Component that alerts if you click outside of it
 */
export default function AccountDropdown(props) {
  const wrapperRef = useRef(null);

  const setOpen = (props) =>{
props===true?wrapperRef.current.classList.toggle("active"):wrapperRef.current.classList.remove("active")
    
  }
    useOutsideAlerter({wrapperRef,setOpen});

    return (
        <div className="right">
              <div className="dropdowncont" ref={wrapperRef}>
                <a href="#" className="profile-image">
<Avatar onClick={()=>setOpen(true)}/>
                </a>
                 
                <div className="dropdown" >
                <List component="nav" aria-label="Account Setting">
                <ListItem button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemIcon style={{color:'rgb(6, 19, 54)'}}>
            <LockOpenIcon style={{fontSize:"2rem"}}/>
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />

        <ListItem button style={{color:'rgb(6, 19, 54)'}}>
          <ListItemIcon style={{color:'rgb(6, 19, 54)'}} >
            <AccountCircleIcon style={{fontSize:"2rem"}}/>
          </ListItemIcon>
          <ListItemText primary="Update Account" />
        </ListItem>

                </List>
                </div>
                
              </div>
        </div>)

    ;
}