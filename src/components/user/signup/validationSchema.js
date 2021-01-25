import * as Yup from "yup";
import axios from 'axios'
import RegistrationModel from "./registrationModel";
import { IsUsernameAvailable } from "../../../helpers/NetworkRequest";
const {
  formField: {
    username,
    password,
    email,
    businessName,
    businessCategory,
    Address,
    avgWorkingHours    // deliveryAgentRequired,
    // deliveryTime,
    // autoScaling
  }
} = RegistrationModel;



export default [
  Yup.object().shape({
    [username.name]: Yup.string().min(3,"min 3 characters").max(15,"max 11 characters")
    .required(`${username.requiredErrorMsg}`),
    [password.name]: Yup.string().min(8,"Min 8 characters required").required(`${password.requiredErrorMsg}`),
    [email.name]: Yup.string().email("Must be a valid email").required(`${email.requiredErrorMsg}`)
  }),
  Yup.object().shape({
    [businessName.name]: Yup.string()
      .min(3,"min 3 characters required")
      .required(`${businessName.requiredErrorMsg}`),
    [businessCategory.name]: Yup.string().required(
      `${businessCategory.requiredErrorMsg}`
    ),
    [Address.name]: Yup.string()
      .required(`${Address.requiredErrorMsg}`)
  }),
  Yup.object().shape({
[avgWorkingHours.name]:Yup.number().max(24,"should be in hours/day").required(`${avgWorkingHours.requiredErrorMsg}`)
  })
];

// [avgWorkingHours.name]: Yup.string().required(
//   `${avgWorkingHours.requiredErrorMsg}`
// ),
// // .matches(visaRegEx, .invalidErrorMsg)
// [avgDeliveryTime.name]: Yup.string()
//   .nullable()
//   .required(`${avgDeliveryTime.requiredErrorMsg}`)
// // .test('expDate', .invalidErrorMsg, val => {
// //   if (val) {
// //     const startDate = new Date();
// //     const endDate = new Date(2050, 12, 31);
// //     if (moment(val, moment.ISO_8601).isValid()) {
// //       return moment(val).isBetween(startDate, endDate);
// //     }
// //     return false;
// //   }
// //   return false;
// // })
