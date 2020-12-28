import AgentModel from "./AgentModel";
const {
  formField: {
    Name,
    Locality,
    Landmark,
    City,
    Pin,
    AgentType,
    PhoneNumber,
    MaxWeightCapacity,
    MaxHourCapacity,
    PicURL,
    BusinessID
  }
} = AgentModel;

export default {
  [Name.name]: "",
  [Locality.name]: "",
  [Landmark.name]: "",
  [City.name]: "",
  [Pin.name]: "",
  [AgentType.name]: "",
  [PhoneNumber.name]: "",
  [MaxHourCapacity.name]: "",
  [MaxWeightCapacity.name]: "",
  [PicURL.name]: '',
  [BusinessID.name]:'',
};
