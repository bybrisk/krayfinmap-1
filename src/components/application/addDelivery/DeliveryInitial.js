import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    CustomerName,
    Locality,
    Landmark,
    City,
    paymentStatus,
    latitude,
    note,
    longitude,
    phone,
    itemWeight,
    PendingAmount
  }
} = DeliveryModel;

export default {
  [CustomerName.name]: "",
  [Locality.name]: "",
  [Landmark.name]: "",
  [City.name]: "",
  [paymentStatus.name]:false,
  [latitude.name]: "",
  [note.name]: "",
  [longitude.name]: "",
  [phone.name]: "",
  [itemWeight.name]: "",
[PendingAmount.name]: ""
};
