import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReactInput from '../../FormField/ReactInput';
import ReactSelect from '../../FormField/ReactSelect';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress'
import { domain } from "../../App";
import { FormSetter, FormContainer, Wrapper, StyledText } from "../../Helpers/Styles";
import { Formik, Form} from "formik";
import validationSchema from "./ValidationSchema";
import AgentModel from "./AgentModel";
import formInitialValues from "./AgentInitial";
import '../../App.css'
import Button from '../../CustomComponents/ReactButton/ReactButton';
import {useSelector} from "react-redux";
import axios from 'axios';
const { formId, formField:{Name,Locality,Landmark,City,Pin,AgentID,PhoneNumber,MaxHourCapacity,MaxWeightCapacity,PicURL,AgentType} } = AgentModel;


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


export default function AgentAdd({closeModal}) {
  const classes = useStyles();
const bybId = useSelector(state => state.bybId)

  function _handleSubmit(values, actions) {
    const article = JSON.stringify({
      Address: values.Locality + "+"+ values.Landmark + "+"+ values.City + "+"+  values.Pin,
      MaxWeightCapacity: values.MaxWeightCapacity,
      MaxHourCapacity: values.MaxHourCapacity,
      PhoneNumber: values.PhoneNumber,
      AgentName: values.Name,
      agentType: values.AgentType,
      BusinessID:bybId,
      AgentID:values.AgentID
    });
    console.log(article)
    axios.post(`${domain}/agents/create`,article)
    .then(response=>{
        console.log(response);

        closeModal({makeRequest:true});
    });
  }


  return (
    <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div className={["flex","align-start"]}>
    <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
         {(props) => (
            <Form id={formId} style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
<Avatar className={classes.avatar} />
<Button width={"100px"} type="submit" disabled = {props.isSubmitting}
   disableFocusRipple = {true}
   disableElevation = {true}>Save</Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<ReactInput name={Name.name} label={Name.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactSelect
            name={AgentType.name}
            label={AgentType.label}
            data={AgentTypeData}
            style={{minWidth:300}}
          />  </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={PhoneNumber.name} label={PhoneNumber.label}  type="tel" style={{minWidth:300}}/>
            </Grid>

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={Locality.name} label={Locality.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={Landmark.name} label={Landmark.label}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={City.name} label={City.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={Pin.name} label={Pin.label}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<ReactInput name={MaxWeightCapacity.name} label={MaxWeightCapacity.label} type="number" style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={MaxHourCapacity.name} label={MaxHourCapacity.label} type="number"  style={{minWidth:300}}/>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <ReactInput name={AgentID.name} label={AgentID.label}  style={{minWidth:300}}/>
            </Grid>

        </Grid>

      </Grid>
    </Grid>



    </Form>
       
       )}

    </Formik>
    </div>
    </Wrapper>
  );
}
