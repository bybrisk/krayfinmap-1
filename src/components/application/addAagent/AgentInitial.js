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
    MaxHourCapacity,
    PicURL,
    AgentID
  }
} = AgentModel;

export default {
  [AgentName.name]: "",
  [Locality.name]: "",
  [Landmark.name]: "",
  [City.name]: "",
  [Pin.name]: "",
  [agentType.name]: "",
  [PhoneNumber.name]: "",
  [MaxHourCapacity.name]: "",
  [MaxWeightCapacity.name]: "",
  [PicURL.name]: '',
  [AgentID.name]:'',
};
