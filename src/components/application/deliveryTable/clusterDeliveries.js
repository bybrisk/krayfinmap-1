//basic dependencies
import red from '@material-ui/core/colors/indigo';
//dependencies for modal
import { makeStyles } from '@material-ui/core/styles';
//dependecies for table
import TableContainer from './tableContainer';
import React, { useEffect, Suspense} from 'react';
import {useHistory} from 'react-router-dom'
import Loader from '../Loader/Loader'
import { Helmet } from "react-helmet";
// import AgentDetail from '../AgentDetails'
import { fetchClusterDeliveries } from 'helpers/NetworkRequest';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//divided component to make them one



//fetchDeliveryDetails to be replaced with get all deliveries




const filterLength = (props) => {
const {array,filter} = props;
return array.filter(item=>item._source.deliveryStatus===filter).length
}

export default function ClusterDeliveries(props) {
    console.log(props.location,props.location.state,"--------------------------------")
    const history = useHistory()
const clusterID = props.location.state!==null && props.location.state.clusterID
console.log(clusterID)
    useEffect(() => {
        fetchClusterDeliveries({clusterID,setDelivery});
  }, [clusterID])

  const [rows,setDelivery] = React.useState([])
   
const filterStats = {
  DeliveryDelivered:filterLength({array:rows,filter:'confirmed'}),
  DeliveryCancelled:filterLength({array:rows,filter:'cancelled'}),
  DeliveryPending:filterLength({array:rows,filter:'pending'}),
  DeliveryTransit:filterLength({array:rows,filter:'transit'})
}
console.log(rows);

  return (
    <>
     <Helmet>
        <title>Deliveries</title>
        <meta name="description" content="List of Deliveries of your account"  />
      </Helmet>
 <Suspense fallback={<Loader />}>
<ArrowBackIcon onClick={()=>history.goBack()}/>
  <TableContainer rows={rows} setDelivery={setDelivery} />
   </Suspense>
  </>
  );
}
