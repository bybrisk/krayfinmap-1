export default {
    formId: "AddAgentForm",
    formField: {
      AgentName: {
        name: "AgentName",
        label: "Name*",
        requiredErrorMsg: "Name is required",
        tip:'Name Of Agent',
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

  }
  };
  