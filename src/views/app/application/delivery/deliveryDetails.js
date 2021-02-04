import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import 'App.css';
import { Wrapper } from "helpers/Styles";
import {fetchDeliveryDetails} from 'helpers/NetworkRequest'
import { Helmet } from "react-helmet";

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
     <Helmet>
        <title>Delivery Details</title>
        <meta name="description" content="Delivery Details"  />
      </Helmet>
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
<StyledText variant="h6">{details.CustomerName}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Phone</StyledText>
            <StyledText variant="h6">{details.phone}</StyledText>
  </Grid>
  <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Delivery id</StyledText>
            <StyledText variant="h6">{id}</StyledText>
  </Grid>
        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20,width:"100%"}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Address</StyledText>
            <StyledText variant="h6">{details.CustomerAddress}</StyledText>
            </Grid>

        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>item Weight</StyledText>
            <StyledText variant="h6">{details.itemWeight}</StyledText>            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Delivery Status</StyledText>
            <StyledText variant="h6">{details.deliveryStatus}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>pincode</StyledText>

            <StyledText variant="h6">{details.pincode}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Payment Done</StyledText>

            <StyledText variant="h6">{details.paymentStatus?'done':'pending'}</StyledText>
  </Grid>
         {details.amount!==0 &&    <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Amount</StyledText>

            <StyledText variant="h6">{details.amount}</StyledText>
  </Grid>} 
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Stamp</StyledText>

            <StyledText variant="h6">{details.timeStamp}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Delivery Agent Id</StyledText>

            <StyledText variant="h6">{details.deliveryAgentID}</StyledText>
  </Grid>
          
        </Grid>

      </Grid>
    </Grid>



    </div>
    </Wrapper>

 
  </>
  );
}
