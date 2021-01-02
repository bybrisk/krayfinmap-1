import React from "react";
import ReactCheckbox from "../../FormField/ReactCheckbox";
import ReactInput from "../../FormField/ReactInput";
import { FormSetter, StyledText } from "../../Helpers/Styles";

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
    formField: { autoScaling, deliveryAgentRequired, deliveryTime }
  } = props;
  return (
    <>
          <StyledText variant="h4">ByBrisk Delivery</StyledText>

<FormSetter>
          <ReactInput
            name={deliveryTime.name}
            label={deliveryTime.label}
            data={DeliveryTime}
            tip={deliveryTime.tip}

          />
          <ReactCheckbox name={autoScaling.name} label={autoScaling.label}             tip={autoScaling.tip}
/>
        </FormSetter>
        </>
  );
};

export default ByBriskDelivery;
