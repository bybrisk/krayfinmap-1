import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    CustomerName,
    CustomerAddress,
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
  [CustomerAddress.name]: "",
  [paymentStatus.name]: "",
  [latitude.name]: "",
  [pincode.name]: "",
  [longitude.name]: "",
  [phone.name]: "",
  [itemWeight.name]: "",
};
