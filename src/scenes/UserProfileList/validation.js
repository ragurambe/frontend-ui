import { FIELD_NAMES } from "./constants";

const mandatory = [
  FIELD_NAMES.firstname,
  FIELD_NAMES.lastname,
  FIELD_NAMES.email_address,
  FIELD_NAMES.phone_number,
  FIELD_NAMES.profile_picture,
];

export function validate(values) {
  let errors = {};
  mandatory.map((field) => {
    if (!values[field]) {
      errors[field] = "This field is required";
    } else {
      delete errors[field];
    }
  });

  return errors;
}

export default { validate };
