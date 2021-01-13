import * as Yup from "yup";
import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    CustomerAddress,
    CustomerName,
    itemWeight,
    paymentStatus,
    phone,
    pincode,
      }
} = DeliveryModel;


export default 
  Yup.object().shape({
    [CustomerAddress.name]: Yup.string().required(`${CustomerAddress.requiredErrorMsg}`),
    [CustomerName.name]: Yup.string().required(`${CustomerName.requiredErrorMsg}`),
    [itemWeight.name]: Yup.number().required(`${itemWeight.requiredErrorMsg}`),
    [paymentStatus.name]: Yup.bool().required(`${paymentStatus.requiredErrorMsg}`),
    [phone.name]: Yup.string().required(`${phone.requiredErrorMsg}`),
    [pincode.name]: Yup.string().required(`${pincode.requiredErrorMsg}`),

})
 

