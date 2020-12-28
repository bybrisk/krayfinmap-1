import RegistrationModel from "./registrationModel";
const {
  formField: {
    username,
    password,
    email,
    businessName,
    businessCategory,
    businessAddress,
    delivery,
    avgWorkingHours,
    avgDeliveryTime,
    deliveryAgentRequired,
    deliveryTime,
    autoScaling,
    haveDeliveryAgent
  }
} = RegistrationModel;

export default {
  [username.name]: "",
  [password.name]: "",
  [email.name]: "",
  [businessName.name]: "",
  [businessAddress.name]: "",
  [businessCategory.name]: "",
  [delivery.name]: '',
  [avgWorkingHours.name]:12,
  [avgDeliveryTime.name]: "",
  [autoScaling.name]: false,
  [deliveryAgentRequired.name]: false,
  [deliveryTime.name]: "",
  [haveDeliveryAgent.name]: false
};
