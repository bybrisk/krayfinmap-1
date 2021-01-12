//basic dependencies
import React,{useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
//dependecies for table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import red from '@material-ui/core/colors/indigo';

//dependencies for modal
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
//divided component to make them one
import Toolbar from './toolbar';
import TableHead from './tableHead';
import { getComparator, search, StyledTableCell, StyledTableRow } from '../tableHelpers/helpers';
// import AgentDetail from '../AgentDetails'
import {fetchAgents} from '../../../helpers/networkRequest'
import {useSelector} from "react-redux";

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

export default function AgentTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('AgentID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [rows,setDelivery] = React.useState([])
  const bybId = useSelector(state => state.bybId);
  const headCells = [
    { id: 'CustomerName', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'CustomerAddress', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'itemWeight', numeric: true, disablePadding: false, label: 'Item Weight' },
    { id: 'paymentMode', numeric: false, disablePadding: false, label: 'Payment' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Mobile' },
    { id: 'deliveryStatus', numeric: false, disablePadding: false, label: 'Delivery Status' },

  ];
  console.log(bybId)
const handleQuery = (query) =>{
setQuery(query.toLowerCase())
}

  //   function handleAgent(){
  //     fetchAgents({bybId,setDelivery});
  // }


  const handleClose = () => {
    setOpen(false);
    fetchAgents({bybId,setDelivery});

  };

  useEffect(() => {
  // fetchAgents({bybId,setDelivery});
setDelivery([
  {id:'1',CustomerName:'Pankaj',CustomerAddress:'11,2 D saket nagar, Indore 462003',itemWeight:'2.5Kg',paymentMode:'COD',phone:'9669212383',deliveryStatus:'confirm'},
  {id:'1',CustomerName:'Praveen',CustomerAddress:'11 D Nayan nagar, Bhopal 472003',itemWeight:'2Kg',paymentMode:'Online',phone:'9669212383',deliveryStatus:'cancelled'},
  {id:'1',CustomerName:'Rohit',CustomerAddress:'11 Kalyani nagar, Sagar 461331',itemWeight:'8Kg',paymentMode:'Credit Card',phone:'9669212383',deliveryStatus:'pending'},
  {id:'1',CustomerName:'Riyaz',CustomerAddress:'Mr 10, near Brillian School, Indore 462003',itemWeight:'5Kg',paymentMode:'Online',phone:'9669212383',deliveryStatus:'pending'},
  {id:'1',CustomerName:'Sagar',CustomerAddress:'11,2 D Gautam nagar, Mahu 462243',itemWeight:'4.5Kg',paymentMode:'Debit Card',phone:'9669121983',deliveryStatus:'cancelled'},
  {id:'1',CustomerName:'Ritu',CustomerAddress:'11,2 D Laxmi nagar, Bhind 462113',itemWeight:'1.5Kg',paymentMode:'Credit Card',phone:'9669216783',deliveryStatus:'confirm'}
])

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
console.log(rows);

//telling how many rows can come into this page
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar setQuery={handleQuery} query={query}/>
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
                      key={row.CustomerName}
                    >
              <StyledTableCell align="center">{row.CustomerName}</StyledTableCell>
              <StyledTableCell align="center">{row.CustomerAddress}</StyledTableCell>
              <StyledTableCell align="center">{row.itemWeight}</StyledTableCell>
              <StyledTableCell align="center">{row.paymentMode}</StyledTableCell>              
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center" style={{color: row.deliveryStatus==='confirm'?'green':(row.deliveryStatus==='pending'?'yellow':'red')}}>{row.deliveryStatus}</StyledTableCell>

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
      <p onClick={handleClose} style={{fontSize:40,textAlign:'right',cursor:'pointer',padding:'0 30px',margin:0}}>x</p>

        {/* <AgentDetail id={row.bybid} handleClose={handleClose}/> */}
      </section>
      </Grow>
      </Modal>

  </>
  );
}
