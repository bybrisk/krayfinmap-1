import React, { Component, useState,useEffect } from "react";
import GoogleMapReact from "google-map-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PubNubProvider, usePubNub } from 'pubnub-react';
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from "@material-ui/core";
import {useSelector} from 'react-redux'
import { fetchClusters } from "helpers/NetworkRequest";
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom'
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

const AnyReactComponent = ({ color }) => (
  <div>
    <RoomRoundedIcon style={{ color: color }} />
  </div>
);

const ClusterMap = () => {
    const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [clusters,setClusters] = useState(null)
  const [isLoading,setLoading] = useState(false);
  const [pendingDeliveries,setDelivery] = useState(null);
        const [channels] = useState(['businessid']);

  const pubnub = usePubNub();
  
  const [center, setCenter] = useState({
    lat: 23.202357,
    lng: 77.414254
  });
  const bybId = useSelector(state => state.bybId)
  const [zoom, setZoom] = useState(11);
  const handleMessage = event => {
    const message = event.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      console.log(message,text,"--5--5--5-5-5-5--5")
      // addMessage(messages => [...messages, text]);
    }
  };

  useEffect(() => {
    setLoading(true)
      fetchClusters({bybId, setClusters,enqueueSnackbar,setLoading,setDelivery});
      return () => {

       }
  }, [bybId])
  console.log(pendingDeliveries);
  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  return (
      <>
           <Helmet>
        <title>Cluster Summary</title>
        <meta name="description" content="Visual Representation of Deliveries of your account Made Simple"  />
      </Helmet>
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
        return   <ListItem button key={item[0].clusterid} component={Link} to={{ pathname: '/dashboard/clusterDeliveries', state: { clusterID: item[0].clusterid} }} className={classes.listItem}>
        <ListItemIcon className={classes.iconContainer}>
    <Paper className={classes.avatar} style={{background:item[0].color}} variant={'circle'}></Paper>
        </ListItemIcon>
        <ListItemText primary={`cluser ${index}`} />
      </ListItem>
   
      })}
        
      </List>
    
       )}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCuMJ3dhADqNoE4tGuWTI3_NlwBihj5BtE" }}
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
                text="My Marker"
              />
            );
          });
        })}
        {clusters===null && pendingDeliveries?.filter(item=>item.deliveryStatus==='pending')?.map((item) => {
          return item.map((clusterItem) => {
            return (
              <AnyReactComponent
                lat={clusterItem.latitude}
                lng={clusterItem.longitude}
                color={'#000'}
                text="My Marker"
              />
            );
          });
        })}
      </GoogleMapReact>
    </div>
  </>);
};
export default ClusterMap;
