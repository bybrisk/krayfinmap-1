import React from "react";
import Input from "../../../inputs/input";
import Select from "../../../inputs/select";
import { FormSetter, StyledText } from "../../../helpers/Styles";
import { Helmet } from "react-helmet";

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
    formField: { avgWorkingHours, deliveryTime }
  } = props;
  return (
    <>
      <Helmet>
        <title>Self Delivery Details</title>
        <meta name="description" content="Details for delivering yourself"  />
      </Helmet>
   
          <StyledText variant="h4">Self Delivery</StyledText>
        <FormSetter>
          <Input
            name={avgWorkingHours.name}
            label={avgWorkingHours.label}
            type={"number"}
            tip={avgWorkingHours.tip}

          />
          <Select
            name={deliveryTime.name}
            label={deliveryTime.label}
            data={agentDeliveryTime}
            tip={deliveryTime.tip}
          />
        </FormSetter>
        </>
  );
};

export default SelfDelivery;
