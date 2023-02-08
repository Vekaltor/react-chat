import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    textPrimary: string;
    textSecondary: string;
    bgPrimary: string;
    bgSecondary: string;
  }
}
