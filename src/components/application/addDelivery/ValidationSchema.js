import * as Yup from "yup";
import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    Locality,
    Landmark,
    City,
    CustomerName,
    itemWeight,
    paymentStatus,
    PendingAmount,
    phone,
    pincode,
      }
} = DeliveryModel;


export default 
  Yup.object().shape({
    [Locality.name]: Yup.string().required(`${Locality.requiredErrorMsg}`),
    [Landmark.name]: Yup.string().required(`${Landmark.requiredErrorMsg}`),
    [City.name]: Yup.string().required(`${City.requiredErrorMsg}`),
    [CustomerName.name]: Yup.string().required(`${CustomerName.requiredErrorMsg}`),
    [itemWeight.name]: Yup.number().min(0).required(`${itemWeight.requiredErrorMsg}`),
    [phone.name]: Yup.string().required(`${phone.requiredErrorMsg}`),
    [pincode.name]: Yup.string().required(`${pincode.requiredErrorMsg}`),
    [paymentStatus.name]: Yup.boolean(),
[PendingAmount.name]: Yup.number().when('paymentStatus', {
  is: false, // alternatively: (val) => val == true
  then: Yup.number().required(`${PendingAmount.requiredErrorMsg}`),
  otherwise: Yup.number().min(0),
})
})
 

