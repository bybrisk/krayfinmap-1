import * as Yup from "yup";
import RegistrationModel from "./registrationModel";
const {
  formField: {
    username,
    password,
    email,
    businessName,
    businessCategory,
    businessAddress,
    avgWorkingHours    // deliveryAgentRequired,
    // deliveryTime,
    // autoScaling
  }
} = RegistrationModel;


export default [
  Yup.object().shape({
    [username.name]: Yup.string().required(`${username.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`)
  }),
  Yup.object().shape({
    [businessName.name]: Yup.string()
      .nullable()
      .required(`${businessName.requiredErrorMsg}`),
    [businessCategory.name]: Yup.string().required(
      `${businessCategory.requiredErrorMsg}`
    ),
    [businessAddress.name]: Yup.string()
      .nullable()
      .required(`${businessAddress.requiredErrorMsg}`)
  }),
  Yup.object().shape({
[avgWorkingHours.name]:Yup.number().required(`${avgWorkingHours.requiredErrorMsg}`)
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
