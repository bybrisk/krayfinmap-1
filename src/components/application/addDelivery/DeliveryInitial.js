import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    CustomerName,
    Address,
    paymentStatus,
    latitude,
    pincode,
    longitude,
    phone,
    itemWeight,
  }
} = DeliveryModel;

export default {
  [CustomerName.name]: "",
  [Address.name]: "",
  [paymentStatus.name]: "",
  [latitude.name]: "",
  [pincode.name]: "",
  [longitude.name]: "",
  [phone.name]: "",
  [itemWeight.name]: "",
};
