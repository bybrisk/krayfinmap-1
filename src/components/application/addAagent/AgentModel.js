export default {
    formId: "AddAgentForm",
    formField: {
      AgentName: {
        name: "AgentName",
        label: "Name*",
        requiredErrorMsg: "Name is required",
        tip:'Name Of Agent',
      },
      Locality: {
        name: "Locality",
        label: "Locality*",
        requiredErrorMsg: "Locality is required",
        tip:'Locality of agent'
      },
      Landmark: {
        name: "Landmark",
        label: "Landmark*",
        requiredErrorMsg: "Landmark is required",
        tip:'Landmark'
      },
      City: {
        name: "City",
        label: "City*",
        requiredErrorMsg: "City is required",
        tip:'City of working'
      },
      Pin: {
        name: "Pin",
        label: "Pin*",
        requiredErrorMsg: "Pin is required",
        tip:'Pin of area'
      },
      agentType: {
        name: "agentType",
        label: "Agent Type*",
        requiredErrorMsg: "Agent Type is required",
        tip:'Agent work basis',
        data:[
          {
            value: undefined,
            label: "None"
          },
          {
            value: "CONTRACT",
            label: "Contract"
          },
          {
            value: "DELIVERY",
            label: "Delivery"
          }
        ]
      },
      PhoneNumber: {
        name: "PhoneNumber",
        label: "Phone Number",
        requiredErrorMsg: "Phone Number is required",
        tip:'Contact of Agent'
      },
      MaxWeightCapacity: {
        name: "MaxWeightCapacity",
        label: "Max Weight Capacity*",
        requiredErrorMsg: "Max Weight Capacity is required",
        tip:'Max Weight Agent Can Carry'
      },
      MaxHourCapacity: {
        name: "MaxHourCapacity",
        label: "Max Hour Capacity",
        requiredErrorMsg: "Max Hour Capacity is required",
        tip:'Max Hour Agent Can work'
      },
      PicURL: {
        name: "PicURL",
        label: "PicURL"
      },
      AgentID: {
        name: "AgentID",
        label: "Agent ID*",
        requiredErrorMsg: "Agent ID is required",
        tip:'unique Id you want to give to Agent'
      },
      AadharNumber:{
        name: "AadharNumber",
        label: "Aadhar Number*",
        requiredErrorMsg: "Aadhar Number is required",
        tip:'Aadhar Number of Agent'

      },
      DrivingLicenceNumber:{
        name: "DrivingLicenceNumber",
        label: "Driving Licence Number*",
        requiredErrorMsg: "Driving Licence Number is required",
        tip:'Driving Licence Number of Agent'
      },
      TypeOfVehicle:{
        name: "TypeOfVehicle",
        label: "Vehicle Type*",
        requiredErrorMsg: "Vehicle Type is required",
        tip:'Type Of Vehicle Given to Agent',
        data:[
          {
            value: undefined,
            label: "None"
          },
          {
            value: "TWO WHEELER",
            label: "Bike"
          },
          {
            value: "VAN",
            label: "Van"
          },
          {
            value: "TRUCK",
            label: "Truck"
          },
          {
            value: "MINI TRUCK",
            label: "Mini Truck"
          }        ]
      },
      PANCardNumber:{
        name: "PANCardNumber",
        label: "PAN Card Number*",
        tip:'PAN Number of Agent'
      }
  }
  };
  