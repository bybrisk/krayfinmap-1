export default {
    formId: "DeliveryForm",
    formField: {
        CustomerAddress: {
        name: "CustomerAddress",
        label: "Address*",
        requiredErrorMsg: "Address is required",
        tip:'Address where This Delivery Should GO'
      },
      CustomerName: {
        name: "CustomerName",
        label: "Name*",
        requiredErrorMsg: "Name is required",
        tip:'Name OF Customer'
      },
      longitude: {
        name: "longitude",
        label: "Longitude*",
        tip:'Longitude of Location'
      },
      phone: {
        name: "phone",
        label: "Phone",
        requiredErrorMsg: "Phone is required",
        tip:'Contact To use For Delivery'
      },
      itemWeight: {
        name: "itemWeight",
        label: "Item Weight*",
        requiredErrorMsg: "Weight is required",
        tip:'Weight Of Item To Be Delivered'
      },
      pincode: {
        name: "pincode",
        label: "PinCode",
        requiredErrorMsg: "PinCode is required",
        tip:'PinCode of Delivery Location'
      },
      PicURL: {
        name: "PicURL",
        label: "PicURL"
      },
      latitude: {
        name: "latitude",
        label: "Latitude*",
      },
      paymentStatus: {
        name: "paymentStatus",
        label: "Payment Done",
        requiredErrorMsg: "Payment Status is required",
        tip:'Is Payment Recieved'
      },
      deliveryStatus: {
        name: "deliveryStatus",
        label: "Delivery Status",
        requiredErrorMsg: "Status",
        tip:'Status of Delivery'
      },
  }
  };
  