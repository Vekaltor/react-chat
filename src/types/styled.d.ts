import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colorPrimary: string;
    colorSecondary: string;
    bgPrimary: string;
    bgSecondary: string;
    bgThirdy: string;
    bgTransparent: string;
    lightPourple: string;
    darkPourple: string;
  }

  export type TypeBgColor =
    | "bgPrimary"
    | "bgSecondary"
    | "bgThirdy"
    | "bgTransparent";

  export type TypeColor = "colorPrimary" | "colorSecondary";
}
