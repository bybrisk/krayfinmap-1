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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import ReactButton from "../../application/button/button";
const CardComponent = (props) => {
  const { title, stat } = props;

  return (
    <Card
      onClick={props.onClick}
      style={{ width: 220, height: 158, textAlign: "center",cursor:'pointer'}}
    >
      <CardHeader title={title} />
      <CardContent style={{ padding: 0 }}>
        <Typography variant="h4" color="textSecondary">
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
  title: {
    flex: "1 1 100%",
    textAlign:'left',
    [theme.breakpoints.down("xs")]: {
      marginBottom:10  
      }
  
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
    width: "50%"
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
  }
}));

//thiis is to show "Agent" at top Helps in fixing
//them just above table
const EnhancedTableToolbar = (props) => {
    const {setQuery,query} = props;
  const classes = useToolbarStyles();
  const [deliveryFilter, setFilter] = React.useState(false);

  const filters = [
    { title: "Deliveries Confirmed", stat: "54", filter: "confirm" },
    { title: "Deliveries Cancelled", stat: "23", filter: "cancelled" },
    { title: "Deliveries Pending", stat: "10", filter: "pending" }
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (newprops) => {
    setOpen(false);
    if (newprops.makeRequest) {
      props.handleAgent();
    }
  };

  const addFilter = (item) => {
    console.log(item, deliveryFilter, "kjgjh");
    setQuery(item);
    setFilter(true);
  };
  const removeFilter = () => {
    setQuery("");
    setFilter(false);
  };

  console.log(deliveryFilter);

  return (
    <>
      <Toolbar style={{ flexDirection: "column" }}>
        <div className={classes.root}>
          <Typography variant="h5" className={classes.title}>Deliveries</Typography>
          <ReactButton
            width={"140px"}
            style={{
            }}
            onClick={handleOpen}
            className={classes.reactbutton}
          >
            Add Delivery <AddIcon style={{ fontSize: "25px", marginTop: "4px" }} />
          </ReactButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Add-Agent"
            aria-describedby="Add-Agent"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 400
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "#ffffff"
            }}
          >
            <Grow in={open} timeout={250}>
              <section
                style={{ background: "#ffffff", width: "100%", height: "100%" }}
              >
                <p
                  onClick={handleClose}
                  style={{
                    fontSize: 40,
                    textAlign: "right",
                    cursor: "pointer",
                    padding: "0 30px",
                    margin: 0
                  }}
                >
                  x
                </p>
                {/* <AgentAdd closeModal={handleClose} /> */}
              </section>
            </Grow>
          </Modal>
        </div>
        {deliveryFilter && (
          <Grow in={deliveryFilter} timeout={250}>
 <section style={{display:'flex',width:'100%',alignItems:'center',marginBottom:10}}>
          <ArrowBackIcon onClick={removeFilter} style={{fontSize:"2rem"}}/>
<p style={{ background: query==='confirm'?'green':(query==='pending'?'yellow':'red'),fontSize:'1.4rem',marginLeft:20,padding:5,color:'#ffffff',borderRadius:6}}> deliveries {query}</p> </section>
     </Grow>   )}

        {/* {deliveryFilter ? (
          <div style={{ color: "green" }}>{query}</div>
        ) : ( */}
          {!deliveryFilter && (
                   <Grow in={!deliveryFilter} timeout={250}>
                   <Grid
        container
        className={classes.gridcontainer}
        onClick={() => setFilter(true)}
        spacing={3}
        style={{ margin: "20px 0" }}
      >
        {filters.map((item) => {
          return (
            <Grid item style={{ marginLeft: 10 }}>
              <CardComponent
                title={item.title}
                stat={item.stat}
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
        </section>
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
