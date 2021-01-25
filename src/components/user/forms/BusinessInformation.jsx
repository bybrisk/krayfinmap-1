import React from "react";
import { FormSetter, StyledText } from "../../../helpers/Styles";
import Input from "../../../inputs/input";
import Select from "../../../inputs/select";
import ReactPlaceInput from "../../../helpers/reactPlace"
import { Helmet } from "react-helmet";

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
    formField: { Address, businessName, businessCategory, delivery }
  } = props;
  return (
    <>
  <Helmet>
        <title>Business Information</title>
        <meta name="description" content="Information of your Business"  />
      </Helmet>
   
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

          <ReactPlaceInput
            name={Address.name}
            label={Address.label}
            type={"text"}
            tip={Address.tip}
            autocomplete={true}

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
