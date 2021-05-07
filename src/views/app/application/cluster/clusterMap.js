import React, { Component, useState,useEffect } from "react";
import GoogleMapReact from "google-map-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularLoader from 'components/application/Loader/circularLoader';
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from "@material-ui/core/Modal";

import { Paper } from "@material-ui/core";
import {useSelector} from 'react-redux'
import { fetchClusters } from "helpers/NetworkRequest";
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom'
const DeliveryDetails = React.lazy(() =>
  import(/* webpackChunkName: "Delivery-Details" */ 'views/app/application/delivery/deliveryDetails')
);
const useStyles = makeStyles((theme) => ({
  listItem:{
paddingTop:0,
paddingBottom:0,
  },
  avatar:{
    height:20,
    width:20,
    borderRadius:'50%',
    
  },
  iconContainer:{
    minWidth:30
  },
  cardContainer:{
    position: "absolute",
    top:150,
    right:45,
    maxWidth: 200,
    maxHeight: 200,
    zIndex:60,
    overflow:'scroll',
    background:'#fff',
    textAlign: "left",
    borderRadius: 10,
    transition: "all 0.4s",
    boxShadow: "0px 0px 120px -25px rgba(0, 0, 0, 0.5)",
    display:'flex',
    alignItems: "flex-start",justifyContent:"center",minWidth:100
  },
}));

const AnyReactComponent = ({ color,onClick }) => (
  <div>
    <RoomRoundedIcon onClick={onClick} style={{ color: color,height:20,width:20 }} />
  </div>
);

const PendingIcon = ({ onClick }) => (
  <div>
    <ShoppingBasketIcon onClick={onClick} style={{ color: 'darkgoldenrod',height:20,width:20 }} />
  </div>
);

const DeliveryManIcon = () => (
  <div>
    <LocalShippingIcon style={{ color: 'blue',height:20,width:20 }} />
  </div>
);
const pubnub = new PubNub({
  publishKey: 'pub-c-b62c8c92-592d-4472-bee9-03e3ccf8645b',
  subscribeKey: 'sub-c-ad9893f0-6907-11eb-b914-eedc703588a5',
  // uuid: 'myUniqueUUID'
});
const ClusterMap = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.user)
console.log(user);
  const classes = useStyles();
  const [clusters,setClusters] = useState(null)
  const [isLoading,setLoading] = useState(false);
  const [pendingDeliveries,setDelivery] = useState(null);
  const [tracking, setTracking] = useState(new Map());     
  const [channels] = useState(['6038bd0fc35e3b8e8bd9f81a']);
  const updateTracking = (message) => {
    setTracking(new Map(tracking.set(message.agent,message)));
  }
  const pubnub = usePubNub();
  
  const [center, setCenter] = useState({
    lat: 23.202357,
    lng: 77.414254
  });
  const bybId = useSelector(state => state.bybId)
  const [zoom, setZoom] = useState(11);
  const [deliveryID, setdeliveryID] = React.useState('');

  const handleMessage = event => {
    const message = event.category;
    // console.log(event);

  };
  const handleOpen = (id) => {
    setdeliveryID(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setTimeout(() => {
    //   fetchAccountDetails({dispatch})  
    // }, 1000);

  };
  useEffect(() => {
    setLoading(true)
      fetchClusters({bybId, setClusters,enqueueSnackbar,setLoading,setDelivery});
      return () => {

       }
  }, [bybId])
  console.log(clusters);

  const throttle = (fn,delay) => {
    let inThrottle = false;
  
    return args => {
      if (inThrottle) {
        return;
      }
  
      inThrottle = true;
      fn(args);
      setTimeout(() => {
        inThrottle = false;
      }, delay);
    };
  };
  

  useEffect(() => {
    pubnub.addListener({
      status: function(statusEvent) {
        // console.log(statusEvent)
          // if (statusEvent.category === "PNConnectedCategory") {
          //   handleMessage()
          // }
      },
      message: function({ channel, message, publisher }) {

if(message){

 updateTracking(message);


  // }, 3000)
}
      },
      presence: function(presenceEvent) {
          // This is where you handle presence. Not important for now :)
      }
  });

  pubnub.subscribe({
      channels: ['6038bd0fc35e3b8e8bd9f81a']
  });
  }, [pubnub, channels]);


  return (
      <>
           <Helmet>
        <title>Cluster Summary</title>
        <meta name="description" content="Visual Representation of Deliveries of your account Made Simple"  />
      </Helmet>
      {isLoading?<CircularLoader/>:(
        <div style={{ height: "90vh", width: "100%" }}>
    <div className={classes.cardContainer} id="bright">
  {isLoading?(<CircularProgress
   style={{height: "30px",
     width: "30px",
   color: "#4caf50"
    }}
       />
       ):(
        <List aria-label="Cluster display">
      
      {clusters?.length===0 && <ListItem className={classes.listItem} style={{marginTop:23,color:'#057g78'}}>No Clusters Present</ListItem>}
      {clusters?.map((item,index)=>{
        return   <ListItem button key={item[0].deliveryAgentName} component={Link} to={{ pathname: '/dashboard/clusterDeliveries', state: { clusterID: item[0].clusterid} }} className={classes.listItem}>
        <ListItemIcon className={classes.iconContainer}>
    <Paper className={classes.avatar} style={{background:item[0].color}} variant={'elevation'}></Paper>
        </ListItemIcon>
        <ListItemText primary={item[0].deliveryAgentName} />
      </ListItem>
   
      })}
        
      </List>
    
       )}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDSl1BOkFlpEiOs3PIavj24cMDo0tDBOIQ" }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals

        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
        }}
        
      >
        {clusters?.map((item) => {
          return item.map((clusterItem) => {
            return (
              <AnyReactComponent
                lat={clusterItem.geometry.latitude}
                lng={clusterItem.geometry.longitude}
                color={clusterItem.color}
                onClick={()=>handleOpen(clusterItem.deliveryid)}
                text="My Marker"
              />
            );
          });
        })}

        {clusters===null && pendingDeliveries?.filter(item=>item._source.deliveryStatus==='Pending')?.map((clusterItem) => {
            return (
              <PendingIcon
                lat={clusterItem._source.latitude}
                lng={clusterItem._source.longitude}
                onClick={()=>handleOpen(clusterItem._id)}
                color={'darkgoldenrod'}

                text="My Marker"
              />
            );
        })}
        {
          [...tracking.values()].map(item=>{
            return(
              <DeliveryManIcon
                lat={item.Lat}
                lng={item.Log}
                // onClick={()=>handleOpen(clusterItem._id)}
                color={'#000'}

                text="My Marker"
              />    
            )
          })
         
        }

      </GoogleMapReact>

    </div>
 
      )

}
<Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Deliveries"
          aria-describedby="Deliveries"
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
          <DeliveryDetails id={deliveryID} handleClose={handleClose}/>
        </section>
        </Grow>
        </Modal>
 
    </>);
};
export default React.memo(ClusterMap);
