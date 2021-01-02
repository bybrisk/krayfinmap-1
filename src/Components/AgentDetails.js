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
import {fetchAgentDetail,deleteAgent} from '../Helpers/NetworkRequest'
import EditAgent from './AddAgent/AddAgent'

const StyledText = styled(Typography)({
    minWidth:250,
})

const data = {
    Name:'Nikhil',
    AgentType:'CONTRACT',
    PhoneNumber:'9669444125',
Address:'Narmada Mandir & Ranhai kalan & Harda & 461331',
City:'Harda',
Pin:'461331',
MaxWeightCapacity:'34',
MaxHourCapacity:'8',
BusinessID:'#e13r4f6c12d',
AgentID:'jcjcnsnzn'
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


export default function AgentDetails(id) {
  const classes = useStyles();
const [details,setDetails] = useState({})
const [isEditing,setEditing] = useState(false);
const handleEditing = (prop) =>{
  fetchAgentDetail({id,setDetails});
  setEditing(prop);
  }
  console.log(id)
useEffect(() => {
  fetchAgentDetail({id,setDetails});
  return () => {
    
  }
}, [])

const handleDeleting = (prop) =>{
  deleteAgent(id);
id.handleClose()
  }
  return (
    <>
   {isEditing? (<EditAgent values={details} setEditing={handleEditing} />):(
   <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div className={["flex","align-start"]}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
<Avatar className={classes.avatar} src={details.PicURL} />
<div>
<Button width={"150px"} style={{marginBottom:20}}onClick={handleEditing}>Edit Agent</Button><br></br>
<Button width={"150px"} onClick={handleDeleting}>Delete Agent</Button>

</div>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Name</StyledText>
<StyledText variant="body2">{details.AgentName}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Agent Type</StyledText>
            <StyledText variant="body2">{details.agentType}</StyledText>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Phone Number</StyledText>
            <StyledText variant="body2">{details.PhoneNumber}</StyledText>
            </Grid>

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Locality</StyledText>
            <StyledText variant="body2">{details.Locality}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Landmark</StyledText>
            <StyledText variant="body2">{details.Landmark}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>City</StyledText>
            <StyledText variant="body2">{details.City}</StyledText>            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Pin</StyledText>
            <StyledText variant="body2">{details.Pin}</StyledText>  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Weight Capacity</StyledText>

            <StyledText variant="body2">{details.MaxWeightCapacity}</StyledText>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>Max Hour Capacity</StyledText>

            <StyledText variant="body2">{details.MaxHourCapacity}</StyledText>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <StyledText variant="subtitle1" style={{color:'grey',marginBottom:10}}>BusinessID</StyledText>

            <StyledText variant="body2">{details.BusinessID}</StyledText>
            </Grid>

        </Grid>

      </Grid>
    </Grid>



    </div>
    </Wrapper>

  )}
  </>
  );
}
