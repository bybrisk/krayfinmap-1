import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Modal from "@material-ui/core/Modal";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from "@material-ui/icons/Search";
import React,{useRef} from "react";
import {useSelector} from 'react-redux';
import ButtonDropdown from './buttonDropdown'
import ReactButton from "components/application/button/button";
import AddDelivery from 'views/app/application/delivery/addDeivery'
import 'App.css'
const CardComponent = (props) => {
  const { title, stat,backgroundColor } = props;
  const classes = useToolbarStyles();

  return (
    <Card
      onClick={props.onClick}
      style={{ width: 180, height: 120, textAlign: "center",cursor:'pointer',backgroundColor:`${backgroundColor}`}}
    >
      <CardHeader title={title} className={classes.cardColor}/>
      <CardContent style={{ padding: 0 }}>
        <Typography variant="h4" color="textSecondary" className={classes.cardColor}>
          {stat}
        </Typography>
      </CardContent>
    </Card>
  );
};
//styles for enhanced table toolbar
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexDirection:'column',
      alignItems: "flex-start",
      }

  },
  rootsearch: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexDirection:'column',
      alignItems: "flex-end",
      }

  },
  title: {
    flex: "1 1 100%",
    textAlign:'left',
    [theme.breakpoints.down("xs")]: {
      marginBottom:"3rem"
      }
  
  },
  cardColor:{
color:'#ffffff'
  },
  reactbutton:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridcontainer: {
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      alignItems: "center"
    }
  },
  search: {
    position: "relative",
    border: "1px solid black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    minWidth: "250px",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width:"100%"
      }

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  refresh: {
    [theme.breakpoints.down("xs")]: {
      marginTop:"1rem"
      }

  },
  filtersActive:{
    display:'flex',
    width:'100%',
    alignItems:'center',
    marginBottom:10,
    [theme.breakpoints.down("xs")]: {
      marginTop:"2.5rem"
      }

  }
}));

//thiis is to show "Agent" at top Helps in fixing
//them just above table
const EnhancedTableToolbar = (props) => {
    const {setQuery,query,handleDelivery} = props;
  const classes = useToolbarStyles();
  const [deliveryFilter, setFilter] = React.useState(false);
  const user = useSelector(state => state.user)
const refresh = useRef(null)
  const filters = [
    { title: "Delivered", stat: user.DeliveryDelivered, filter: "delivered",color:'darkolivegreen' },
    { title: "Cancelled", stat: user.DeliveryCancelled, filter: "cancelled",color:'indianred' },
    { title: "Pending", stat: user.DeliveryPending, filter: "pending",color:'darkgoldenrod' },
    { title: "Transit", stat: user.DeliveryTransit, filter: "transit",color:'cornflowerblue' }

  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (newprops) => {
    setOpen(false);
    if (newprops.makeRequest) {
      handleDelivery()
        }
  };

  const addFilter = (item) => {
    setQuery(item);
    setFilter(true);
  };
  const removeFilter = () => {
    setQuery("");
    setFilter(false);
  };

  const handleRefresh = () =>{
    refresh.current.classList.add('refresh')
    handleDelivery(refresh)
  }

  return (
    <>
      <Toolbar style={{ flexDirection: "column" }}>
        <div className={classes.root}>
          <Typography variant="h5" className={classes.title}>Deliveries</Typography>
      <ButtonDropdown />
         </div>
        {deliveryFilter && (
          <Grow in={deliveryFilter} timeout={250}>
 <section className={classes.filtersActive}>
          <ArrowBackIcon onClick={removeFilter} style={{fontSize:"2rem"}}/>
<p style={{ background: query==='delivered'?'darkolivegreen':(query==='pending'?'darkgoldenrod':(query==='cancelled'?'indianred':'cornflowerblue')),fontSize:'1rem',marginLeft:20,padding:2,color:'#ffffff',borderRadius:6}}> deliveries {query}</p> </section>
     </Grow>   )}

        {/* {deliveryFilter ? (
          <div style={{ color: "green" }}>{query}</div>
        ) : ( */}
          {!deliveryFilter && (
                   <Grow in={!deliveryFilter} timeout={250}>
                   <Grid
        container
        className={classes.gridcontainer}
        spacing={3}
        style={{ margin: "20px 0" }}
      >
        {filters.map((item) => {
          return (
            <Grid item style={{ marginLeft: 10,borderRadius:24}}>
              <CardComponent
                title={item.title}
                stat={item.stat}
                backgroundColor={item.color}
                onClick={() => addFilter(item.filter)}
              />
            </Grid>
          );
        })}
      </Grid></Grow>
      
          )  }
    
        <section
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            marginBottom:20,
            marginLeft:-10
          }}
        >
         <div className={classes.rootsearch}>
         <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
      <AutorenewIcon onClick={handleRefresh} className={classes.refresh} ref={refresh} />
         </div>
         </section>
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
