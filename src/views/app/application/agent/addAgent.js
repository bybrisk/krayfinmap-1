import React,{} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '../../../../inputs/input';
import Select from '../../../../inputs/select';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { domain } from "../../../../App";
import { Wrapper } from "../../../../helpers/Styles";
import { Formik, Form} from "formik";
import validationSchema from "../../../../components/application/addAagent/ValidationSchema";
import AgentModel from "../../../../components/application/addAagent/AgentModel";
import formInitialValues from "../../../../components/application/addDelivery/DeliveryInitial";
import '../../../../App.css'
import Button from '../../../../components/application/button/button';
import {useSelector} from "react-redux";
import axios from 'axios';
const { formId, formField:{AgentName,Locality,Landmark,City,Pin,AgentID,PhoneNumber,MaxHourCapacity,MaxWeightCapacity,agentType} } = AgentModel;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:20,
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection:'column-reverse',
      marginBottom:20
    }

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


export default function AgentAdd(props) {
  const classes = useStyles();
const bybId = useSelector(state => state.bybId)
const intialvalue = props.values || formInitialValues;
console.log(props.ref)
const [pic,setFile] = React.useState(intialvalue.PicURL)




const handleChange = function loadFile(event) {
  if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
  }
};


  function _handleSubmit(values) {
    const article = {
      Address: values.Locality + " & "+ values.Landmark + " & "+ values.City + " & "+  values.Pin,
      MaxWeightCapacity: values.MaxWeightCapacity,
      MaxHourCapacity: values.MaxHourCapacity,
      PhoneNumber: values.PhoneNumber,
      AgentName: values.AgentName,
      agentType: values.agentType,
      BusinessID:bybId,
      AgentID:values.AgentID,
      PicURL:pic,
      bybID:values.bybId
    };
    console.log(article)
    let newDomain 
    if(props.values){
      newDomain = `${domain}/agents/modifyAgent`
    }
    else{
      newDomain = `${domain}/agents/addAgent`
    }
    axios.post(newDomain,article)
    .then(response=>{
        console.log(response);
        props.closeModal && props.closeModal({makeRequest:true});
        props.setEditing &&  props.setEditing(false);    });
  }


  return (
    <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}
ref={props.ref}
     >
    <div className={["flex","align-start"]}>
    <Formik
            initialValues={intialvalue}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
         {(props) => (
            <Form id={formId} style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
  <div>
  <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
            <label htmlFor="upload">
                <IconButton color="primary" aria-label="upload picture" component="span" disableRipple={true} size={'medium'} >
                    <Avatar id="avatar" src={pic}
style={{height:100,width:100}}
                    />
                </IconButton>
            </label>
            <label htmlFor="avatar"/>

</div>
<Button width={"100px"} type="submit" disabled = {props.isSubmitting}
   disableFocusRipple = {true}
   disableElevation = {true}>Save</Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={AgentName.name} label={AgentName.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Select
            name={agentType.name}
            label={agentType.label}
            data={AgentTypeData}
            style={{minWidth:300}}
          />  </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={PhoneNumber.name} label={PhoneNumber.label}  type="tel" style={{minWidth:300}}/>
            </Grid>

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={Locality.name} label={Locality.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={Landmark.name} label={Landmark.label}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={City.name} label={City.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={Pin.name} label={Pin.label}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={MaxWeightCapacity.name} label={MaxWeightCapacity.label} type="number" style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={MaxHourCapacity.name} label={MaxHourCapacity.label} type="number"  style={{minWidth:300}}/>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={AgentID.name} label={AgentID.label}  style={{minWidth:300}}/>
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
