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
    [Locality.name]: Yup.string().min(3,"not less than 3 characters").max(20,"not more than 20 characters").required(`${Locality.requiredErrorMsg}`),
    [Landmark.name]: Yup.string().min(3,"not less than 3 characters").max(20,"not more than 20 characters").required(`${Landmark.requiredErrorMsg}`),
    [City.name]: Yup.string().min(3,"not less than 3 characters").max(20,"not more than 20 characters").required(`${City.requiredErrorMsg}`),
    [CustomerName.name]: Yup.string().min(3,"not less than 3 characters").max(30,"not more than 30 characters").required(`${CustomerName.requiredErrorMsg}`),
    [itemWeight.name]: Yup.number().min(0).required(`${itemWeight.requiredErrorMsg}`),
    [phone.name]: Yup.string().min(10,"must be a valid phone").max(13).required(`${phone.requiredErrorMsg}`),
    [pincode.name]: Yup.string().length(6).matches(`^[1-9]{1}[0-9]{2}[0-9]{3}$`,"must be a valid pin").required(`${pincode.requiredErrorMsg}`),
    [paymentStatus.name]: Yup.boolean(),
[PendingAmount.name]: Yup.number().when('paymentStatus', {
  is: false, // alternatively: (val) => val == true
  then: Yup.number().required(`${PendingAmount.requiredErrorMsg}`),
  otherwise: Yup.number().min(0),
})
})
 

