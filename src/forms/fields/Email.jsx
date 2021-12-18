import React from "react";
import Text from "./Text";

const Email = function Email(props) {
  const { field, handleChange } = props;
  return <Text field={field} handleChange={handleChange} />;
};

export default Email;
