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
          <ReactCheckbox
            name={deliveryAgentRequired.name}
            label={deliveryAgentRequired.label}
          />
          <ReactInput
            name={deliveryTime.name}
            label={deliveryTime.label}
            data={DeliveryTime}
          />
          <ReactCheckbox name={autoScaling.name} label={autoScaling.label} />
        </FormSetter>
        </>
  );
};

export default ByBriskDelivery;
