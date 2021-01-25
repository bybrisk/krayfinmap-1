import * as Yup from "yup";
import DeliveryModel from "./DeliveryModel";
const {
  formField: {
    Address,
    CustomerName,
    itemWeight,
    paymentStatus,
    phone,
    pincode,
      }
} = DeliveryModel;


export default 
  Yup.object().shape({
    [Address.name]: Yup.string().required(`${Address.requiredErrorMsg}`),
    [CustomerName.name]: Yup.string().required(`${CustomerName.requiredErrorMsg}`),
    [itemWeight.name]: Yup.number().required(`${itemWeight.requiredErrorMsg}`),
    [phone.name]: Yup.string().required(`${phone.requiredErrorMsg}`),
    [pincode.name]: Yup.string().required(`${pincode.requiredErrorMsg}`),

})
 

