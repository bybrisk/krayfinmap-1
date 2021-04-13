//basic dependencies
import Backdrop from '@material-ui/core/Backdrop';
import red from '@material-ui/core/colors/indigo';
import Grow from '@material-ui/core/Grow';
//dependencies for modal
import Modal from "@material-ui/core/Modal";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
//dependecies for table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from './tableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, Suspense} from 'react';
import Loader from '../Loader/Loader'
import { Helmet } from "react-helmet";
import { useSelector,useDispatch} from "react-redux";
// import AgentDetail from '../AgentDetails'
import { fetchAccountDetails, fetchDeliveries, modifyStatus } from 'helpers/NetworkRequest';
import { getComparator, search, StyledTableCell, StyledTableRow } from '../tableHelpers/helpers';
import Select from './StatusDropdown';
import TableHead from './tableHead';
//divided component to make them one
import Toolbar from './toolbar';
import CircularLoader from '../Loader/circularLoader';


const DeliveryDetails = React.lazy(() =>
  import(/* webpackChunkName: "Delivery-Details" */ 'views/app/application/delivery/deliveryDetails')
);

//fetchDeliveryDetails to be replaced with get all deliveries

const pending = [
  {
    value: "Pending",
    label: "Pending",
    color:'#8C6911'
  },
  {
    value: "Transit",
    label: "Transit",
    color:'blue'
  }
]
const transit = [
  {
    value: "Transit",
    label: "Transit",
    color:'blue'
  },
  {
    value: "Delivered",
    label: "Delivered",
    color:'green'
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    color:'red'
  },
]

const delivered = [
  {    value: "Delivered",
  label: "Delivered",
  color:'green'}
]
const cancelled = [
  {    value: "Cancelled",
  label: "Cancelled",
  color:'red'}
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    paddingTop:20
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  avatar: {
    color: '#ffffff',
    backgroundColor:red[700],
  },
}));

export default function DeliveryTable() {
  const [rows,setDelivery] = React.useState([])
  const bybID = useSelector(state => state.bybId);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isLoading,setLoading] = React.useState(false);

const filterStats = {
  DeliveryDelivered:user.DeliveryDelivered,
  DeliveryCancelled:user.DeliveryCancelled,
  DeliveryPending:user.DeliveryPending,
  DeliveryTransit:user.DeliveryTransit
}
function handleDelivery(refreshRef){
      fetchDeliveries({bybID,setDelivery});
     refreshRef && setTimeout(()=>{refreshRef.current.classList.remove('refresh')},2000)
     setTimeout(()=>{fetchAccountDetails({dispatch,bybID})},3000)
    }

  useEffect(() => {
    fetchDeliveries({bybID,setDelivery,setLoading});

return () => {
      
    }
  }, [])

  return (
    <>
     <Helmet>
        <title>Deliveries</title>
        <meta name="description" content="List of Deliveries of your account"  />
      </Helmet>
 <Suspense fallback={<CircularLoader />}>
  {
    isLoading ? <CircularLoader/> :  <TableContainer rows={rows} handleDelivery={handleDelivery} setDelivery={setDelivery} filterStats={filterStats} />

  }
   </Suspense>
  </>
  );
}
