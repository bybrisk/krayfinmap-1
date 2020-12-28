import React from "react";
import { Typography } from "@material-ui/core";
import ReactInput from "../../FormField/ReactInput";
import { FormSetter,StyledText } from "../../Helpers/Styles";
import ReactSelect from "../../FormField/ReactSelect";

const deliveryType = [
  {
    value: undefined,
    label: "None"
  },
  {
    value: "self",
    label: "Self Delivery"
  },
  {
    value: "bybrisk",
    label: "ByBrisk Delivery"
  }
];

const BusinessInformation = (props) => {
  const {
    formField: { businessAddress, businessName, businessCategory, delivery }
  } = props;
  return (
    <>

<StyledText variant="h4">Business Information</StyledText>

        <FormSetter>
          <ReactInput
            name={businessName.name}
            label={businessName.label}
            type={"text"}
          />
          <ReactInput
            name={businessCategory.name}
            label={businessCategory.label}
            type={"text"}
          />

          <ReactInput
            name={businessAddress.name}
            label={businessAddress.label}
            type={"text"}
          />
          <ReactSelect
            name={delivery.name}
            label={delivery.label}
            data={deliveryType}
          />
        </FormSetter>
        </>
  );
};

export default BusinessInformation;
