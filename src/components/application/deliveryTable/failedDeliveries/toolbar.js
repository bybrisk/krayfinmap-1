import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import React, { useRef, useState, Suspense } from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from 'react-redux';
import 'App.css';
import { Button } from '@material-ui/core';
import ReactButton from "../../button/button";
import XLSX from 'xlsx';

//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        flexDirection:'column',
        alignItems: "flex-start",
      
        }
  
    },
    reactbutton:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    root1:{
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      padding:'0 30px',

    },
    btn:{
      maxWidth:220,
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
      border: 'none',
      outline: "none",
      height: 49,
      borderRadius: 49,
      color: "#fff",
      textTransform: "uppercase",
      fontWeight: "600",
      margin: "10px 0",
      cursor: "pointer",
      transition: "0.5s",
    '&:hover':{
      backgroundColor: theme.palette.secondary.light,

    },
    [theme.breakpoints.down("sm")]:{
      maxWidth: 180,
  height:42
    }
    },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  //thiis is to show "Agent" at top Helps in fixing 
  //them just above table
  const EnhancedTableToolbar = (props) => {
    const {rows} = props
    const classes = useToolbarStyles();
    const [open, setOpen] = React.useState(false);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
  // this has to be done by ref so when window event resize listener will trigger - we will get the current element
  const exportToCSV = () => {
    
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    const element = document.createElement("a");
  //  const file = new Blob(data,    
  //              {type:fileType});
               console.log(data)
               element.href = URL.createObjectURL(data);
   element.download = 'FailedDeliveries.xlsx';
   document.body.appendChild(element);
   element.click();
   console.log(element)
}

    return (
      <>
      <Toolbar
        className={classes.root}
      >
   
      <Typography variant="h5">Failed Deliveries</Typography>
      <ReactButton
            width={"140px"}
            padding={'.5rem'}
            style={{
            }}
            className={classes.reactbutton}
            onClick={exportToCSV}
          >
            <CloudDownloadIcon style={{ fontSize: "25px", marginTop: "4px" }} />
          </ReactButton>
    
      </Toolbar>
 {/* <div className={classes.root1}>
      <Grid item xs={12} md={10} container justify="flex-start" style={{marginBottom:20}}>
        <Grid item xs={12} md={2} lg={2} container alignItems="center">
          <Typography variant="h6">center_id :</Typography>
        </Grid>
        <Grid container xs={12} md={8} alignItems="center">
          <Typography variant="h5" component="h5">{supervisor_id}</Typography>
        </Grid>
      </Grid>
</div> */}
 </>
    );
  };

  export default EnhancedTableToolbar;