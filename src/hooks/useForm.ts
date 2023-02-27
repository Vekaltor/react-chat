import { useState, useEffect, FormEvent, FocusEvent, ChangeEvent } from "react";
import { isEmptyObject } from "../utils/isEmptyObject";

interface listOfInputsForm<ObjectType> {
  email?: ObjectType;
  password?: ObjectType;
  name?: ObjectType;
}

interface errors extends listOfInputsForm<string> {}
interface references extends listOfInputsForm<HTMLElement> {}
interface values extends listOfInputsForm<string> {}

const validate = (
  values: values,
  references: references,
  e: FocusEvent<HTMLInputElement>
): errors => {
  let errors: errors = {};
  let lastFocusedElement: HTMLInputElement = e.target;

  lastFocusedElement.removeAttribute("valid");

  if (values.name && !/^[a-zA-Z]*$/.test(values?.name!)) {
    errors.name = "Only letters are allowed";
    references.name?.removeAttribute("valid");
  } else if (values.name) references.name?.setAttribute("valid", "true");

  if (values.email && !/\S+@\S+\.\S+/.test(values?.email!)) {
    errors.email = "Email address is invalid";
    references.email?.removeAttribute("valid");
  } else if (values.email) references.email?.setAttribute("valid", "true");

  if (values.password && values.password.length < 5) {
    errors.password = "Password length is too small";
    references.password?.removeAttribute("valid");
  } else if (values.password)
    references.password?.setAttribute("valid", "true");

  return errors;
};

const useForm = () => {
  const [values, setValues] = useState<values>({});
  const [errors, setErros] = useState<errors>({});
  const [references, setReferences] = useState<references>({});

  const updateValues = (e: ChangeEvent<HTMLInputElement>): void => {
    let input: HTMLInputElement = e.currentTarget;
    setErros({ ...errors, [input.name]: "" });
    setReferences({ ...references, [input.name]: input });
    setValues({ ...values, [input.name]: input.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isEmptyObject(errors) && !isEmptyObject(values))
      console.log(`send...`, values, errors);
  };

  const validateElement = (e: FocusEvent<HTMLInputElement>): void => {
    setErros(validate(values, references, e));
  };

  useEffect(() => {
    return () => {
      setErros({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [updateValues, submitHandler, errors, validateElement] as const;
};

export default useForm;
