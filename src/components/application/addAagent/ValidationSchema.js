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
    AadharNumber,
    DrivingLicenceNumber,
    TypeOfVehicle,
    PANCardNumber
      }
} = AgentModel;


export default 
  Yup.object().shape({
    [AgentName.name]: Yup.string().min(3,"min 3 characters").max(30,"max 30 characters").required(`${AgentName.requiredErrorMsg}`),
    [Locality.name]: Yup.string().min(2,"min length 2").required(`${Locality.requiredErrorMsg}`),
    [Landmark.name]: Yup.string().min(2,"min length 2").required(`${Landmark.requiredErrorMsg}`),
    [City.name]: Yup.string().min(2,"min length 2").required(`${City.requiredErrorMsg}`),
    [Pin.name]: Yup.string().length(6).matches(`^[1-9]{1}[0-9]{2}[0-9]{3}$`,"must be a valid pin").required(`${Pin.requiredErrorMsg}`),
    [agentType.name]: Yup.string().required(`${agentType.requiredErrorMsg}`),
    [PhoneNumber.name]: Yup.string().min(10,"min length 10").required(`${PhoneNumber.requiredErrorMsg}`),
    [MaxWeightCapacity.name]: Yup.number().min(0).required(`${MaxWeightCapacity.requiredErrorMsg}`),
    [MaxHourCapacity.name]: Yup.number().min(0).max(24).required(`${MaxHourCapacity.requiredErrorMsg}`),
    [AgentID.name]: Yup.string().required(`${AgentID.requiredErrorMsg}`),
    [AadharNumber.name]: Yup.string().matches(`^[2-9]{1}[0-9]{11}$`,"Should be a valid Aadhar Number").required(`${AadharNumber.requiredErrorMsg}`),
    [DrivingLicenceNumber.name]: Yup.string().matches(`^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$`,"should be a valid license").required(`${DrivingLicenceNumber.requiredErrorMsg}`),
    [TypeOfVehicle.name]: Yup.string().required(`${TypeOfVehicle.requiredErrorMsg}`),
    [PANCardNumber.name]: Yup.string().matches(`[A-Z]{5}[0-9]{4}[A-Z]{1}`,"should be a valid Pan Card Number")
})


 

