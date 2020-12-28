import React, {
  useState
} from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress
} from "@material-ui/core";
import {
  StyledText
} from "../Helpers/Styles";
import {
  FormSetter,
  FormContainer,
  Wrapper} from "../Helpers/Styles";
import {domain} from "../App";
import {Link,useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Formik,Form} from "formik";
import Login from "./Forms/Login";
import BusinessInformation from "./Forms/BusinessInformation";
import ByBriskDelivery from "./Forms/ByBriskDelivery";
import SelfDelivery from "./Forms/SelfDelivery";
import Signup from "./Forms/Signup";
import Button from "../CustomComponents/ReactButton/ReactButton";

import validationSchema from "./FormModel/validationSchema";
import RegistrationModel from "./FormModel/registrationModel";
import formInitialValues from "./FormModel/formInitialValues";
import Logo from '../Assets/logo.png'
import {
  CreateAccount
} from '../Helpers/NetworkRequest'
import axios from 'axios'
// import useStyles from "./styles";
import '../App.css'
const steps = ["Shipping address", "Payment details", "Review your order"];
const {
  formId,
  formField
} = RegistrationModel;

function _renderStepContent(activeStep, values) {
  console.log(activeStep, values)
  switch (activeStep) {
    case 0:
      return <Signup formField = {
        formField
      }
      />;
    case 1:
      return <BusinessInformation formField = {
        formField
      }
      />;
    case 2:
      return values.delivery === "bybrisk" ? ( < ByBriskDelivery formField = {
          formField
        }
        />
      ) : ( < SelfDelivery formField = {
          formField
        }
        />
      );
    default:
      return <div> Not Found </div>;
  }
}

export default function Registration(props) {
  // const classes = useStyles();
  console.log(props)
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    const article = JSON.stringify({
      Email: values.email,
      Password: values.password,
      BusinessCategory: values.businessCategory,
      BusinessName: values.businessName,
      UserName: values.username,
      Address: values.businessAddress,
      AvgWorkingHours: values.avgWorkingHours || 12,
      DeliveryAgent: 2,
      AutoScaling: values.autoScaling,
      BybriskDelivery: (values.delivery === 'bybrisk' ? true : false),
      InstantDelivery: values.deliveryTime === '24' ? false : true,
      BusinessPlan: "1"
    });

    axios.post(`${domain}/account`,{article})
    .then(response=>{
        console.log(response.data);
        // article.bybID = response.bybID;
  localStorage.setItem("user", JSON.stringify(article));
  localStorage.setItem("bybId", JSON.stringify(response.data.bybID));

  dispatch({
    type: "LOG_IN",
    payload: true
  });
  dispatch({
    type: "ID",
    payload: response.data.bybID
  });
  dispatch({
    type: "USER",
    payload: article
  });
  actions.setSubmitting(false);
  history.push("/home");

    });
// if(response.bybID){
//   article.bybID = response.bybID;
//   localStorage.setItem("user", JSON.stringify(response.user));

//   dispatch({
//     type: "LOG_IN",
//     payload: true
//   });
//   dispatch({
//     type: "ID",
//     payload: response.bybID
//   });
//   dispatch({
//     type: "USER",
//     payload: article
//   });
//   actions.setSubmitting(false);
//   history.push("/home");

// }
// else{
//   actions.setSubmitting(false);

// }
   
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      console.log(activeStep);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return ( 
  <React.Fragment >
      <Wrapper className = "wrapper" > 
      <FormContainer >
      <React.Fragment>
      <img src = {Logo} style = {{maxWidth: 140}} alt="Krayfinmap"/>

      <React.Fragment>

      <Formik initialValues = {formInitialValues}
validationSchema = {currentValidationSchema}
onSubmit = {_handleSubmit} >

{(props) => (
  
  <Form id={formId} style = {{
       width: '100%',
       height: '480px',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'column'
     }} > 
     {_renderStepContent(activeStep, props.values)} 
   
     <div style = {{
       width: "100%",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       marginTop: 20
     }} >
   <Button disabled = {props.isSubmitting}
   disableFocusRipple = {true}
   disableElevation = {true}
   type = "submit"
   variant = "outlined"
   fullwidth > 
   {props.isSubmitting ?  <CircularProgress size = {24}/> :(isLastStep ? 'Complete Signup' : 'Continue')}
    </Button> 
    
  
 </div>

 </Form>

)}

 </Formik>

</React.Fragment>


    <Typography style = {{marginTop: "10px"}} varient = "caption" >Already have a account ? {" "}
     <a style = {{
        textDecoration: "none",
        color: "#FF6F1F",
        cursor: 'pointer'}}
  onClick = {props.clickHandler} >
    Login </a> </Typography>  
    </React.Fragment>

    </FormContainer> </Wrapper>
   
    </React.Fragment>
);
}