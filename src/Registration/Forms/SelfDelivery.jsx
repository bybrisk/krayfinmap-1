import React from "react";
import ReactCheckbox from "../../FormField/ReactCheckbox";
import ReactInput from "../../FormField/ReactInput";
import ReactSelect from "../../FormField/ReactSelect";
import { FormSetter, StyledText } from "../../Helpers/Styles";

const agentDeliveryTime = [
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
  }];

const SelfDelivery = (props) => {
  const {
    formField: { avgWorkingHours, haveDeliveryAgent, deliveryTime }
  } = props;
  return (
    <>
          <StyledText variant="h4">Self Delivery</StyledText>
        <FormSetter>
          <ReactInput
            name={avgWorkingHours.name}
            label={avgWorkingHours.label}
            type={"number"}
          />
          <ReactCheckbox
            name={haveDeliveryAgent.name}
            label={haveDeliveryAgent.label}
          />
          <ReactSelect
            name={deliveryTime.name}
            label={deliveryTime.label}
            data={agentDeliveryTime}
          />
        </FormSetter>
        </>
  );
};

export default SelfDelivery;
