import React from "react";
import { FormSetter, StyledText } from "../../../helpers/styles";
import Input from "../../../inputs/input";
import Select from "../../../inputs/select";

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
          <Input
            name={businessName.name}
            label={businessName.label}
            type={"text"}
            tip={businessName.tip}

          />
          <Input
            name={businessCategory.name}
            label={businessCategory.label}
            type={"text"}
            tip={businessCategory.tip}

          />

          <Input
            name={businessAddress.name}
            label={businessAddress.label}
            type={"text"}
            tip={businessAddress.tip}

          />
          <Select
            name={delivery.name}
            label={delivery.label}
            data={deliveryType}
            tip={delivery.tip}

          />
        </FormSetter>
        </>
  );
};

export default BusinessInformation;
