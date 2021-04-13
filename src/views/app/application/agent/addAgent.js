import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Input from 'inputs/input';
import Select from 'inputs/select';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Helmet } from "react-helmet";

import { domain } from "App";
import { Wrapper } from "helpers/Styles";
import {AddAgent,modifyAgent} from 'helpers/NetworkRequest'
import { Formik, Form} from "formik";
import validationSchema from "components/application/addAagent/ValidationSchema";
import AgentModel from "components/application/addAagent/AgentModel";
import formInitialValues from "components/application/addDelivery/DeliveryInitial";
import 'App.css'
import Button from 'components/application/button/button';
import {useSelector} from "react-redux";
import axios from 'axios';
const { formId, formField:{AgentName,AgentID,PhoneNumber,MaxHourCapacity,MaxWeightCapacity,TypeOfVehicle} } = AgentModel;


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



export default function AgentAdd(props) {
  const {closeModal,setEditing} = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

const bybId = useSelector(state => state.bybId)
const intialvalue = props.values || formInitialValues;
const [pic,setFile] = React.useState(intialvalue.PicURL)




const handleChange = function loadFile(event) {
  if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
  }
};


  function _handleSubmit(values,actions) {
    const article = JSON.stringify({
      Address: "",
      MaxWeightCapacity: values.MaxWeightCapacity,
      MaxHourCapacity: values.MaxHourCapacity,
      PhoneNumber: values.PhoneNumber,
      AgentName: values.AgentName,
      agentType: "Delivery",
      BusinessID:bybId,
      AgentID:values.AgentID,
      picurl:pic,
      bybID:values.bybId,
      AadharNumber:"",
      DrivingLicenceNumber:"",
      PANCardNumber:"",
      TypeOfVehicle: values.TypeOfVehicle
    });
    if(props.values){
      modifyAgent({article,actions,setEditing,enqueueSnackbar})

    }
    else{
      AddAgent({article,actions,closeModal,enqueueSnackbar})
    }
  }


  return (
    <>
      <Helmet>
        <title>Add Agent</title>
        <meta name="description" content="Add Your Agent"  />
      </Helmet>
   
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
   disableElevation = {true}>
          {props.isSubmitting ?  <CircularProgress size = {16}/>: 'Save'}

   </Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={AgentName.name} label={AgentName.label} tip={AgentName.tip}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={PhoneNumber.name} tip={PhoneNumber.tip} label={PhoneNumber.label}  type="tel" style={{minWidth:300}}/>
            </Grid>

        </Grid>

        
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={MaxWeightCapacity.name} tip={MaxWeightCapacity.tip} label={MaxWeightCapacity.label} type="number" style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={MaxHourCapacity.name} tip={MaxHourCapacity.tip} label={MaxHourCapacity.label} type="number"  style={{minWidth:300}}/>
  </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={AgentID.name} tip={AgentID.tip} label={AgentID.label}  style={{minWidth:300}}/>
            </Grid>

        </Grid>


        <Grid container justify="left" spacing={4}>
   <Grid item style={{marginLeft:20}}>
   <Select
            name={TypeOfVehicle.name}
            label={TypeOfVehicle.label}
            data={TypeOfVehicle.data}
            style={{minWidth:300}}
            tip={TypeOfVehicle.tip}

          />            </Grid>

        </Grid>

      </Grid>
    </Grid>



    </Form>
       
       )}

    </Formik>
    </div>
    </Wrapper>
    </>
  );
}
