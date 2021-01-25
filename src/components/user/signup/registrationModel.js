

export default {
    formId: "onboardingForm",
    formField: {
      username: {
        name: "username",
        label: "Username*",
        tip:'Username Should Be Unique',
        requiredErrorMsg: "Username is required"
      },
      password: {
        name: "password",
        label: "Password*",
        tip:"It contains at least 8 characters and at most 20 characters \n \v \n It contains at least one digit.  \v  \n It contains at least one upper and one lower case alphabet.\n It contains at least one special character which includes !@#$%&*()-+=^.\n It doesn’t contain any white space.",
        requiredErrorMsg: "Password is required"
      },
      email: {
        name: "email",
        label: "Email*",
        tip:'Your Business Email-ID',
        requiredErrorMsg: "Email is required"
      },
      businessName: {
        name: "businessName",
        label: "Business Name*",
        tip:'Cool Business Name For Your Business',
        requiredErrorMsg: "BusinessName is required"
      },
      businessCategory: {
        name: "businessCategory",
        label: "BusinessCategory*",
        tip:'Sector in Which You Are Doing Business',
        requiredErrorMsg: "BusinessCategory is required"
      },
      Address: {
        name: "Address",
        label: "Business Address*",
        tip:'Address of Business Office',
        requiredErrorMsg: "Business Address is required"
      },
      delivery: {
        name: "delivery",
        label: "delivery*",
        tip:'Specify Type Of Delivery',
        requiredErrorMsg: "Delivery is required"
      },
      avgWorkingHours: {
        name: "avgWorkingHours",
        label: "Average Working Hours*",
        tip:'Average Business Working Hours',
        requiredErrorMsg: "Working Hours is required"
      },
      avgDeliveryTime: {
        name: "avgDeliveryTime",
        label: "Average Delivery Time*",
        tip:'Time in Which Your Deliveries are currently Delivered',
        requiredErrorMsg: "Average Delivery Time is required"
      },
      deliveryAgentRequired: {
        name: "deliveryAgentRequired",
        label: "Delivery Agent Required",
        tip:'IF Delivery Agent Needed',
      },
      deliveryTime: {
        name: "deliveryTime",
        label: "Delivery Time",
        tip:'Speed of Delviery',
        requiredErrorMsg: "Delivery Time is required"
      },
      autoScaling: {
        name: "autoScaling",
        tip:'Will Automatically increase Agents When more Deliveries are pending',
        label: "Auto Scaling"
      },
      haveDeliveryAgent: {
        name: "haveDeliveryAgent",
        tip:'if delivery Agent are available',
        label: "Have Delivery Agent"
      },
      longitude:{
        name: "haveDeliveryAgent",
      },
      latitude:{
        name: "haveDeliveryAgent",
      }
    }
  };
  