import React from "react";
import Text from "./Text";

const Password = function Password(props) {
  const { field, handleChange } = props;
  return <Text field={field} handleChange={handleChange} />;
};

export default Password;
