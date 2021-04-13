import * as Yup from "yup";
import AgentModel from "./AgentModel";
const {
  formField: {
    AgentName,
    PhoneNumber,
    MaxWeightCapacity,
    AgentID,
    MaxHourCapacity ,
    TypeOfVehicle,

      }
} = AgentModel;


export default 
  Yup.object().shape({
    [AgentName.name]: Yup.string().min(3,"min 3 characters").max(30,"max 30 characters").required(`${AgentName.requiredErrorMsg}`),
    [PhoneNumber.name]: Yup.string().min(10,"min length 10").required(`${PhoneNumber.requiredErrorMsg}`),
    [MaxWeightCapacity.name]: Yup.number().min(0).required(`${MaxWeightCapacity.requiredErrorMsg}`),
    [MaxHourCapacity.name]: Yup.number().min(0).max(24).required(`${MaxHourCapacity.requiredErrorMsg}`),
    [AgentID.name]: Yup.string().required(`${AgentID.requiredErrorMsg}`),
    [TypeOfVehicle.name]: Yup.string().required(`${TypeOfVehicle.requiredErrorMsg}`),

})


 

