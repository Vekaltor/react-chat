import { ChangeEventHandler, ReactElement, ReactNode } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import ThemeContext from "./ThemeContext";

type ThemeContextProviderProps = {
  theme: string;
  themes: {
    darkTheme: DefaultTheme;
    lightTheme: DefaultTheme;
  };
  children?: ReactNode;
  themeToggler: ChangeEventHandler<HTMLInputElement>;
};

export const ThemeContextProvider = (
  props: ThemeContextProviderProps
): ReactElement => {
  const { theme, themes, themeToggler, children } = props;
  const { darkTheme, lightTheme } = themes;
  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
