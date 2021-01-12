import React from "react";
import Checkbox from "../../../inputs/checkbox";
import Input from "../../../inputs/input";
import { FormSetter, StyledText } from "../../../helpers/styles";

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
          <StyledText variant="h4">ByBrisk Delivery</StyledText>

<FormSetter>
          <Input
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
