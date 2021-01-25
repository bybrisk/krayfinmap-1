import RegistrationModel from "./registrationModel";
const {
  formField: {
    username,
    password,
    email,
    businessName,
    businessCategory,
    Address,
    delivery,
    avgWorkingHours,
    avgDeliveryTime,
    deliveryAgentRequired,
    deliveryTime,
    autoScaling,
    haveDeliveryAgent,
    longitude,
    latitude
  }
} = RegistrationModel;

export default {
  [username.name]: "",
  [password.name]: "",
  [email.name]: "",
  [businessName.name]: "",
  [Address.name]: "",
  [businessCategory.name]: "",
  [delivery.name]: '',
  [avgWorkingHours.name]:12,
  [avgDeliveryTime.name]: "",
  [autoScaling.name]: false,
  [deliveryAgentRequired.name]: false,
  [deliveryTime.name]: "",
  [haveDeliveryAgent.name]: false,
  [longitude.name]:'',
  [latitude.name]:''
};
