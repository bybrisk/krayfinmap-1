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
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, Suspense} from 'react';
import Loader from '../Loader/Loader'
import { Helmet } from "react-helmet";
import { useSelector,useDispatch} from "react-redux";
// import AgentDetail from '../AgentDetails'
import { fetchAccountDetails, fetchDeliveries, modifyStatus } from '../../../helpers/NetworkRequest';
import { getComparator, search, StyledTableCell, StyledTableRow } from '../tableHelpers/helpers';
import Select from './StatusDropdown';
import TableHead from './tableHead';
//divided component to make them one
import Toolbar from './toolbar';


const DeliveryDetails = React.lazy(() =>
  import(/* webpackChunkName: "Delivery-Details" */ '../../../views/app/application/delivery/deliveryDetails')
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
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('AgentID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [deliveryID, setdeliveryID] = React.useState('');

  const [query, setQuery] = React.useState('');
  const [rows,setDelivery] = React.useState([])
  const bybID = useSelector(state => state.bybId);
  const lastChild = useRef(null);
  const headCells = [
    { id: 'CustomerName', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'CustomerAddress', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'itemWeight', numeric: true, disablePadding: false, label: 'Item Weight' },
    { id: 'paymentMode', numeric: false, disablePadding: false, label: 'Payment' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Mobile' },
    { id: 'deliveryStatus', numeric: false, disablePadding: false, label: 'Delivery Status' },

  ];

  const handleQuery = (query) =>{
setQuery(query.toLowerCase())
}
console.log(bybID)
    function handleDelivery(refreshRef){
      fetchDeliveries({bybID,setDelivery});
     refreshRef && setTimeout(()=>{refreshRef.current.classList.remove('refresh')},2000)
     setTimeout(()=>{fetchAccountDetails({dispatch,bybID})},3000)
    }

  const handleOpen = (id) => {
    setdeliveryID(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      fetchAccountDetails({dispatch})  
    }, 1000);

  };

  const handleStatusChange = async (e,id) =>{
    enqueueSnackbar('Status Change Can Take Upto 3s',{
      variant: 'success',
      autoHideDuration: 2500,
  });

   const param =  {
      BybID: bybID,
      DeliveryID: id,
      deliveryStatus: e.target.value
      }
    
  await modifyStatus({param,setDelivery})
  }
  useEffect(() => {
    fetchDeliveries({bybID,setDelivery});

return () => {
      
    }
  }, [])

  //this function set the state for sorting information
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  //function for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //function for row change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

//telling how many rows can come into this page
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
     <Helmet>
        <title>Deliveries</title>
        <meta name="description" content="List of Deliveries of your account"  />
      </Helmet>
 <Suspense fallback={<Loader />}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar setQuery={handleQuery} query={query} handleDelivery={handleDelivery}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="Agents"
            aria-label="Agent Data"
          >
            <TableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows && (
                search(rows,query,getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <>
                    <StyledTableRow
                      tabIndex={-1}
                      key={row._source.CustomerName}
                      ref={lastChild}
                      style={{cursor:'pointer'}}
                      >
              <StyledTableCell align="center" onClick={()=>handleOpen(row._id)} >{row._source.CustomerName}</StyledTableCell>
              <StyledTableCell align="center" onClick={()=>handleOpen(row._id)}>{row._source.CustomerAddress}</StyledTableCell>
              <StyledTableCell align="center" onClick={()=>handleOpen(row._id)}>{row._source.itemWeight}</StyledTableCell>
              <StyledTableCell align="center" onClick={()=>handleOpen(row._id)}>{row._source.paymentStatus?'done':'not done'}</StyledTableCell>              
              <StyledTableCell align="center" onClick={()=>handleOpen(row._id)}>{row._source.phone}</StyledTableCell>
              <StyledTableCell id="deliverystatus" align="center" >
              <Select
               data={row._source.deliveryStatus==='Delivered'?delivered:(row._source.deliveryStatus==='Pending'?pending:(row._source.deliveryStatus==='Cancelled'?cancelled:transit))} value={row._source.deliveryStatus} 
               handleChange={(e)=>handleStatusChange(e,row._id)} />
              </StyledTableCell>

                    </StyledTableRow>
    
   </>
  
                  );
                })
              )
                }
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
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
</Suspense>
  </>
  );
}
