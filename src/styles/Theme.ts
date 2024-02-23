import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  name: "dark",
  colorPrimary: "#f1f1f1",
  colorSecondary: "#747577",
  bgPrimary: "#202123",
  bgSecondary: "#17181a",
  bgThirdy: "#191a1c",
  bgTransparent: "transparent",
  lightPourple: "#7739fe",
  darkPourple: "#6232cd",
};

export const lightTheme: DefaultTheme = {
  name: "light",
  colorPrimary: "#1c1c1c",
  colorSecondary: "#1c1c1c",
  bgPrimary: "#FAFAFA",
  bgSecondary: "#F0F0F0",
  bgThirdy: "#F0F0F0",
  bgTransparent: "transparent",

  //CHANGE FOR LIGHTTHEME
  lightPourple: "#7739fe",
  darkPourple: "#6232cd",
};

enum themeNames {
  DARK = "dark",
  LIGHT = "light",
}

const themes = {
  darkTheme,
  lightTheme,
};

export const initialTheme: string = themeNames.DARK;

export default themes;
