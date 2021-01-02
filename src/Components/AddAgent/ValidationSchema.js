import * as Yup from "yup";
import AgentModel from "./AgentModel";
const {
  formField: {
    AgentName,
    Locality,
    Landmark,
    City,
    Pin,
    agentType,
    PhoneNumber,
    MaxWeightCapacity,
    AgentID,
    MaxHourCapacity ,
      }
} = AgentModel;


export default 
  Yup.object().shape({
    [AgentName.name]: Yup.string().required(`${AgentName.requiredErrorMsg}`),
    [Locality.name]: Yup.string().required(`${Locality.requiredErrorMsg}`),
    [Landmark.name]: Yup.string().required(`${Landmark.requiredErrorMsg}`),
    [City.name]: Yup.string().required(`${City.requiredErrorMsg}`),
    [Pin.name]: Yup.string().required(`${Pin.requiredErrorMsg}`),
    [agentType.name]: Yup.string().required(`${agentType.requiredErrorMsg}`),
    [PhoneNumber.name]: Yup.string().required(`${PhoneNumber.requiredErrorMsg}`),
    [MaxWeightCapacity.name]: Yup.number().required(`${MaxWeightCapacity.requiredErrorMsg}`),
    [MaxHourCapacity.name]: Yup.number().required(`${MaxHourCapacity.requiredErrorMsg}`),
    [AgentID.name]: Yup.string().required(`${AgentID.requiredErrorMsg}`)

})
 

