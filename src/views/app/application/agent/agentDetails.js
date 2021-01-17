import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Grow from '@material-ui/core/Grow';
import { useSnackbar } from 'notistack';
import CircularProgress from "@material-ui/core/CircularProgress";

import '../../../../App.css';
import Button from '../../../../components/application/button/button';
import { deleteAgent, fetchAgentDetail } from '../../../../helpers/NetworkRequest';
import { Wrapper } from "../../../../helpers/Styles";
import EditAgent from './addAgent';

const StyledText = styled(Typography)({
    minWidth:250,
})



const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginLeft:20
  },
  paper: {
    height: 140,
    minWidth: 300,
  },
  avatar:{
    width:"7em",
    height:"7em"
  }
}));



export default function AgentDetails(prop) {
  const {id,handleClose} = prop;
  const classes = useStyles();
const [details,setDetails] = useState({})
const [isEditing,setEditing] = useState(false);
const [isDeleting,setDeleting] = useState(false);
const { enqueueSnackbar } = useSnackbar();

const handleEditing = (prop) =>{
  fetchAgentDetail({id,setDetails});
  setEditing(prop);
  }
  
useEffect(() => {
  fetchAgentDetail({id,setDetails});
  return () => {
    
  }
}, [id])

const handleDeleting = () =>{
  setDeleting(true)
  deleteAgent({id,enqueueSnackbar,handleClose});
  }
  return (
    <>
   {isEditing? (<EditAgent values={details} setEditing={handleEditing} />):(
   <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div className={["flex","align-start"]}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
<Avatar className={classes.avatar} src={details.PicURL} />
<div>
{Object.keys(details).length!==0 && (
  <Grow in={Object.keys(details).length!==0} timeout={1050}>
<>
<Button width={"150px"} style={{marginBottom:20}} disabled = {isEditing}    disableFocusRipple = {true}
   disableElevation = {true} onClick={handleEditing}>              {isEditing ?  <CircularProgress size = {16}/>: 'Edit Agent'}
 </Button><br></br>
<Button width={"150px"} onClick={handleDeleting}    disableFocusRipple = {true}
   disableElevation = {true} disabled = {isDeleting}>
             {isDeleting ?  <CircularProgress size = {16}/>: 'Delete Agent'}

   </Button>
</>

</Grow>
)}
</div>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Name</StyledText>
<StyledText variant="body2">{details.AgentName}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Agent Type</StyledText>
            <StyledText variant="body2">{details.agentType}</StyledText>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Phone Number</StyledText>
            <StyledText variant="body2">{details.PhoneNumber}</StyledText>
            </Grid>

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Locality</StyledText>
            <StyledText variant="body2">{details.Locality}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Landmark</StyledText>
            <StyledText variant="body2">{details.Landmark}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>City</StyledText>
            <StyledText variant="body2">{details.City}</StyledText>            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Pin</StyledText>
            <StyledText variant="body2">{details.Pin}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Weight Capacity</StyledText>

            <StyledText variant="body2">{details.MaxWeightCapacity}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Hour Capacity</StyledText>

            <StyledText variant="body2">{details.MaxHourCapacity}</StyledText>
  </Grid>
        </Grid>

      </Grid>
    </Grid>



    </div>
    </Wrapper>

  )}
  </>
  );
}
