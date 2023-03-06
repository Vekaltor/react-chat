import {
  ChangeEvent,
  FocusEvent,
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactElement,
} from "react";

export type InputBaseProps = {
  children?: ReactElement;
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  type?: HTMLInputTypeAttribute;
  value?: string;
};
