import React,{useState,useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {postCluster,fetchAgents} from 'helpers/NetworkRequest'
import {useSelector} from "react-redux";
import { useSnackbar } from 'notistack';
import ReactButton from "../button/button";




const tableToolbar = makeStyles((theme) => ({
  title: {
    fontWeight: 550,
    fontSize: "2rem"
  },
  toolbarContainer: {
    padding: theme.spacing(3, 1)
  }
}));

export default function Toolbar(props) {
  console.log(props)
  const {setClusters,totaldeliveries} = props
    const [isSubmitting,setSubmitting] = useState(false);
    const [rows,setAgents] = React.useState([])
    const bybId = useSelector(state => state.bybId)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchAgents({bybId,setAgents});
      
          return () => {
            
          }
        }, [bybId])
    const [cluster,setCluster] = useState(null);


    const handleClusters = () =>{
        setSubmitting(true)

        // console.log(rows,cluster>rows.length,cluster===0,"---------------")
        // console.log(cluster,"-------------------")
        // if(cluster>rows.length || cluster===0){
          // console.log('This cluster cannot be made')
          //   setSubmitting(false)
          //   setCluster(null)
// return;
//         }
// else{
  const clusterData = JSON.stringify({
    BybID:bybId,
    NumberOfCluster:0
})
postCluster({clusterData,enqueueSnackbar,setSubmitting,bybId, setCluster})
// }
    
// setCluster(0)
      }
  const classes = tableToolbar();
  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
      className={classes.toolbarContainer}
    >
      <Grid item xs={12} md={10} container justify="flex-start" >
        <Typography
          variant="h5"
          component={"h6"}
          gutterBottom
          className={classes.title}
        >
          Cluster
        </Typography>
      </Grid>
      <Grid item xs={12} md={10} container justify="flex-start" style={{marginBottom:20}}>
        <Grid container xs={12} alignItems="flex-start">

          <ReactButton variant="contained"         disableFocusRipple={true}
                        disableElevation={true}
                        type="submit"
                        onClick={handleClusters}

 style={{marginTop:6,
    maxWidth: 180}}>
  {isSubmitting ? (
                          <CircularProgress
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "#fff"
                            }}
                          />
                        ) : (
                          'Create Clusters'
                        )}
 </ReactButton>
        </Grid>
      </Grid>
      <Grid item xs={12} md={10} container justify="flex-start" style={{marginBottom:20}}>
        <Grid item xs={12} md={3} lg={3} container alignItems="center">
          <Typography variant="h6">Total Deliveries :</Typography>
        </Grid>
        <Grid container xs={12} md={8} alignItems="center">
          <Typography variant="h4" component="h5">{totaldeliveries}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
