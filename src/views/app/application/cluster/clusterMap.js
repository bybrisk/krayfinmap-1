import React, { Component, useState,useEffect } from "react";
import GoogleMapReact from "google-map-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularLoader from 'components/application/Loader/circularLoader';

import { Paper } from "@material-ui/core";
import {useSelector} from 'react-redux'
import { fetchClusters } from "helpers/NetworkRequest";
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

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
    <RoomRoundedIcon style={{ color: color,height:20,width:20 }} />
  </div>
);

const PendingIcon = ({ color }) => (
  <div>
    <ShoppingBasketIcon style={{ color: 'darkgoldenrod',height:20,width:20 }} />
  </div>
);
const pubnub = new PubNub({
  publishKey: 'pub-c-b62c8c92-592d-4472-bee9-03e3ccf8645b',
  subscribeKey: 'sub-c-ad9893f0-6907-11eb-b914-eedc703588a5',
  // uuid: 'myUniqueUUID'
});
const ClusterMap = () => {
    const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [clusters,setClusters] = useState(null)
  const [isLoading,setLoading] = useState(false);
  const [pendingDeliveries,setDelivery] = useState(null);
        const [channels] = useState(['6038bd0fc35e3b8e8bd9f81a']);

  const pubnub = usePubNub();
  
  const [center, setCenter] = useState({
    lat: 23.202357,
    lng: 77.414254
  });
  const bybId = useSelector(state => state.bybId)
  const [zoom, setZoom] = useState(11);
  const handleMessage = event => {
    const message = event.message;
    console.log(message);

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
                color={'darkgoldenrod'}
                text="My Marker"
              />
            );
        })}
      </GoogleMapReact>

    </div>
 
      )

}
    </>);
};
export default ClusterMap;
