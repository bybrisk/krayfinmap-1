import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import '../../../../App.css';
import { Wrapper } from "../../../../helpers/Styles";
import {fetchDeliveryDetails} from '../../../../helpers/NetworkRequest'

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
  const {id} = prop;
  const classes = useStyles();
const [details,setDetails] = useState({})
useEffect(() => {
  fetchDeliveryDetails({id,setDetails});
  return () => {
    
  }
}, [id])

  return (
    <>
   
   <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div className={["flex","align-start"]}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
<Avatar className={classes.avatar} src={details.PicURL} />
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Name</StyledText>
<StyledText variant="body2">{details.CustomerName}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Phone</StyledText>
            <StyledText variant="body2">{details.phone}</StyledText>
  </Grid>
          
        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Address</StyledText>
            <StyledText variant="body2">{details.CustomerAddress}</StyledText>
            </Grid>
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>item Weight</StyledText>
            <StyledText variant="body2">{details.itemWeight}</StyledText>            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Delivery Status</StyledText>
            <StyledText variant="body2">{details.deliveryStatus}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>pincode</StyledText>

            <StyledText variant="body2">{details.pincode}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>paymentStatus</StyledText>

            <StyledText variant="body2">{details.paymentStatus}</StyledText>
  </Grid>
          
        </Grid>

      </Grid>
    </Grid>



    </div>
    </Wrapper>

 
  </>
  );
}
