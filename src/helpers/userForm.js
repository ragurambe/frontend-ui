import { useState, useEffect } from "react";

const useForm = (callback, validate, initial = {}) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [isTouched, setTouched] = useState(false);

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleSubmit = (event) => {
    setTouched(true);
    if (event) event.preventDefault();
    let validationErrors = validate(values);
    setErrors({ ...errors, ...validationErrors });
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  const handleChange = (data) => {
    setValues((values) => ({ ...values, [data.name]: data.value }));
    let validationErrors = validate({ ...values, [data.name]: data.value });
    setErrors({ ...errors, [data.name]: validationErrors[data.name] });
  };

  const resetValidation = (values) => {
    setValues(values);
    setErrors({});
    setTouched(false);
  };

  return {
    handleChange,
    handleSubmit,
    resetValidation,
    values,
    errors,
  };
};

export default useForm;
