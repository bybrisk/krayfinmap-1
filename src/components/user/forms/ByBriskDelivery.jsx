import React from "react";
import Checkbox from "../../../inputs/checkbox";
import Select from "../../../inputs/select";
import { FormSetter, StyledText } from "../../../helpers/Styles";
import { Helmet } from "react-helmet";

const DeliveryTime = [
  {
    value: undefined,
    label: "None"
  },
  {
    value: "24",
    label: "24 Hour"
  },
  {
    value: "1",
    label: "1 Hour"
  }
];

const ByBriskDelivery = (props) => {
  const {
    formField: { autoScaling, deliveryTime }
  } = props;
  return (
    <>
      <Helmet>
        <title>Bybrisk Delivery</title>
        <meta name="description" content="Details of deliveries we are going to deliver"  />
      </Helmet>
   
          <StyledText variant="h4">ByBrisk Delivery</StyledText>

<FormSetter>
          <Select
            name={deliveryTime.name}
            label={deliveryTime.label}
            data={DeliveryTime}
            tip={deliveryTime.tip}

          />
          <Checkbox name={autoScaling.name} label={autoScaling.label} tip={autoScaling.tip}
/>
        </FormSetter>
        </>
  );
};

export default ByBriskDelivery;
