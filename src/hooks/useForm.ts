import { useState, useEffect, SetStateAction } from "react";
import { EventTargetElement } from "../types/EventTargetElement";

const validate = (values: any): string[] => {
  let errors: string[] = [];
  console.log(values.email);
  if (
    values.email &&
    !values.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push("Please provide correct email");
  }

  if (!values.password) {
    errors.push("Please provide password");
  }
  return errors;
};

const useForm = (initial: Object): [any, any, any] => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState([]);

  const updateValues = (e: EventTargetElement): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: Event): void => {
    e.preventDefault();
    if (!errors.length) console.log(`send...`, values);
  };

  useEffect(() => {
    let listErrors = validate(values) as SetStateAction<never[]>;
    console.log(listErrors);
    setErrors(listErrors);

    return () => {
      setErrors([]);
    };
  }, [values]);

  return [updateValues, submitHandler, errors];
};

export default useForm;
