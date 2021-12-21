/* eslint-disable no-unused-vars */

import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

// Form components
import Header from "./Header";
import Footer from "./Footer";
import FormComponents from "./fields/FormComponents";

// Logic
import paginationReducer from "./paginationReducer";

import { useAuth } from "../auth/AuthContext";

const FormBuilder = function FormBuilder(props) {
  const { wizardJSON, formPurpose } = props;
  const { currentUser, handleSignIn } = useAuth();

  // This will serve for useRef for file inputs (we don't know how many file inputs will the formJSON require)
  const refInputs = React.useRef({});

  const [output, setOutput] = React.useState("");

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState(() =>
    wizardJSON[0].pages.map((page) => ({
      ...page,
      fields: page.fields.map((field) => {
        // We will be adding default validity parameter to each field
        if (field.type === "select" && field.value === "") {
          // Also, we will set the default value for select (=first option label)
          return { ...field, value: field.options[0].label, validity: true };
        }
        if (field.type === "checkbox" && field.value === "") {
          // and for checkbox (=false) if those values are missing
          return { ...field, value: false, validity: true };
        }
        if (field.type === "file" || field.type === "password") {
          // Let's use this mapping for setting Refs as well
          refInputs.current = {
            ...refInputs.current,
            [field.id]: React.createRef(),
          };
          return { ...field, value: "", validity: true };
        }
        return { ...field, validity: true, page: "" };
      }),
    }))
  );

  // Initialize pagination
  const [pagination, dispatchPagination] = React.useReducer(paginationReducer, {
    currentPage: 0,
    lastPage: data.length - 1,
  });

  const displayThisField = React.useCallback(
    (dependantField) => {
      // This method is for conditional logic of showing an extra field if a checkbox is checked
      // If a field has the property showIfChecked, we verify the checkbox it points to,
      // whether it is checked, and decide whether to show the field or not
      if (
        dependantField.showIfChecked &&
        data.some((page) =>
          page.fields.some(
            (mainField) =>
              mainField.id === dependantField.showIfChecked &&
              mainField.value === false
          )
        )
      ) {
        return false;
      }
      return true;
    },
    [data]
  );

  const fieldValidity = React.useCallback(
    (field, newValue) => {
      const value = typeof newValue === "undefined" ? field.value : newValue;
      if (field.required && displayThisField(field)) {
        switch (field.type) {
          case "email":
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
          default:
            return value !== "" && value !== false;
        }
      }
      return true;
    },
    [displayThisField]
  );

  const pageValidation = React.useCallback(
    (pageToValidate) => {
      let allValid = true;
      setData(
        data.map((page, index) => {
          if (pageToValidate === "all" || pageToValidate === index) {
            return {
              ...page,
              fields: page.fields.map((field) => {
                const validity = fieldValidity(field);
                if (!validity) allValid = false;
                return {
                  ...field,
                  validity,
                };
              }),
            };
          }
          return { ...page };
        })
      );
      return allValid;
    },
    [data, fieldValidity]
  );

  /*
  async function handleSignUp(result) {
    if (
      result.password1 &&
      result.password2 &&
      result.password1 !== result.password2
    ) {
      return setError("Passwords do not match.");
    }
    try {
      setLoading(true);
      await authToolkit.signUp(result.email, result.password);
    } catch {
      setError("Error while creating account.");
    }
    return setLoading(false);
  }
  */

  const handleSubmit = React.useCallback(
    (event) => {
      // Prevent form submit
      event.preventDefault();

      // Internal validation
      const allValid = pageValidation("all");

      if (!allValid) {
        console.log("There are invalid fields!");
        event.stopPropagation();
        return false;
      }

      // Parsing the final data
      const resultArray = data
        .map((page) =>
          page.fields.map((field) => {
            if (displayThisField(field)) {
              return { [field.id]: field.value };
            }
            return false;
          })
        )
        .flat()
        .filter((field) => field);

      // Flatten the fields into a single object
      const result = Object.assign(...resultArray);

      // Fulfill the purpose of the form
      switch (formPurpose) {
        case "signUp":
          /*
          createUserWithEmailAndPassword(auth, result.email, result.password)
            .then((userCredential) => {
              console.log(userCredential.user.email);
            })
            .catch((er) => {
              console.log(er);
            });
            */
          break;
        case "logIn":
          handleSignIn(result.email, result.password)
            .then((userCredential) => {
              console.log(userCredential.user.email);
            })
            .catch((er) => {
              console.log(er);
            });
          break;
        default:
          // Print the result
          setOutput(JSON.stringify(result, null, 2));
      }

      return false;
    },
    [data, displayThisField, formPurpose, handleSignIn, pageValidation]
  );

  const handleChange = React.useCallback(
    (event) => {
      // Prepare values first
      let value;
      if (event.target.type === "checkbox") {
        // For checkbox, we get values from event.target.checked
        value = event.target.checked;
      } else if (event.target.type === "file") {
        // For file, we get if from Refs
        value = refInputs.current[event.target.id].current.files[0]
          ? refInputs.current[event.target.id].current.files[0].name
          : "";
      } else {
        // For input["text", "email"], textarea, and select, we get if from event.target.value
        value = event.target.value;
      }

      // Update state with new values based on IDs
      setData(
        data.map((page) => ({
          ...page,
          fields: page.fields.map((field) => {
            if (field.id === event.target.id) {
              // We found the field that is being edited
              // Send updated data
              return { ...field, value, validity: fieldValidity(field, value) };
            }
            // If this field is not edited, just return the old data
            return field;
          }),
        }))
      );
    },
    [data, fieldValidity]
  );

  const renderForm = () => {
    // This method renders all fields of the form
    const form = data[pagination.currentPage].fields.map((field) => {
      if (displayThisField(field)) {
        const capitalizedType =
          field.type.charAt(0).toUpperCase() + field.type.slice(1);
        let DesiredComponent = FormComponents.DefaultField;
        if (typeof FormComponents[capitalizedType] !== "undefined") {
          DesiredComponent = FormComponents[capitalizedType];
        }
        return (
          <DesiredComponent
            key={field.id}
            field={field}
            handleChange={handleChange}
            refInputs={refInputs}
          />
        );
      }
      return null;
    });
    if (form.length) return form;
    return <Alert variant="danger">No fields available.</Alert>;
  };

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Form onSubmit={handleSubmit} noValidate>
        <Card key={data[pagination.currentPage].title}>
          <Header className="text-center fs-4">
            {data[pagination.currentPage].title}
          </Header>
          <Card.Body>{renderForm()}</Card.Body>
          <Footer
            pagination={pagination}
            dispatchPagination={dispatchPagination}
            pageValidation={pageValidation}
          />
        </Card>
      </Form>
      <pre>{output}</pre>
      <pre>{error}</pre>
      <pre>{loading.toString()}</pre>
      <pre>{currentUser}</pre>
    </div>
  );
};

export default FormBuilder;
