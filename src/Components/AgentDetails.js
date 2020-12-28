import React,{useEffect,useState} from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReactInput from '../FormField/ReactInput';
import ReactSelect from '../FormField/ReactSelect';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { domain } from "../App";
import { FormSetter, FormContainer, Wrapper } from "../Helpers/Styles";
import '../App.css'
import Button from '../CustomComponents/ReactButton/ReactButton';
import {fetchAgentDetail} from '../Helpers/NetworkRequest'
const StyledText = styled(Typography)({
    minWidth:250,
})

const data = {
    Name:'Nikhil',
    AgentType:'Contact',
    PhoneNumber:'9669444125',
Address:'Narmada Mandir Ranhai',
City:'Harda',
Pin:'461331',
MaxWeightCapacity:'34',
MaxHourCapacity:'8',
BusinessID:'#e13r4f6c12d'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:20
  },
  paper: {
    height: 140,
    minWidth: 300,
  },
  avatar:{
    width:"7em",
    height:"7em"
  }
}));

const AgentTypeData = [
  {
    value: undefined,
    label: "None"
  },
  {
    value: "CONTRACT",
    label: "Contract"
  },
  {
    value: "DELIVERY",
    label: "Delivery"
  }
];


export default function AddAgent(id) {
  const classes = useStyles();
const [details,setDetails] = useState({})
useEffect(() => {
const response =  fetchAgentDetail(id);
setDetails(response.data);
  return () => {
    
  }
}, [])


  return (
    <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div className={["flex","align-start"]}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
<Avatar className={classes.avatar} />
<Button width={"100px"}>Edit</Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Name</StyledText>
<StyledText variant="body2">{data.Name}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Agent Type</StyledText>
            <StyledText variant="body2">{data.AgentType}</StyledText>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Phone Number</StyledText>
            <StyledText variant="body2">{data.PhoneNumber}</StyledText>
            </Grid>

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Address</StyledText>

            <StyledText variant="body2">{data.Address}</StyledText>
            </Grid>
          
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>City</StyledText>

            <StyledText variant="body2">{data.City}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Pin</StyledText>

            <StyledText variant="body2">{data.Pin}</StyledText>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Weight Capacity</StyledText>

            <StyledText variant="body2">{data.MaxWeightCapacity}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Hour Capacity</StyledText>

            <StyledText variant="body2">{data.MaxHourCapacity}</StyledText>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>BusinessID</StyledText>

            <StyledText variant="body2">{data.BusinessID}</StyledText>
            </Grid>

        </Grid>

      </Grid>
    </Grid>



    </div>
    </Wrapper>
  );
}
