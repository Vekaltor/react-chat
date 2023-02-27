import { ChangeEventHandler, createContext } from "react";

type ThemeContextProps =
  | {
      theme: string;
      themeToggler: ChangeEventHandler<HTMLInputElement>;
    }
  | undefined;

const ThemeContext = createContext<ThemeContextProps>(undefined);
export default ThemeContext;
