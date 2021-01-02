import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default function Notification(props) {
    const {severity} = props
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
  
    const handleClick = (Transition) => () => {
      setTransition(() => Transition);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        severity={severity}
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          message="I love snacks"
          key={transition ? transition.name : ''}
        />
      
    );
  }
  