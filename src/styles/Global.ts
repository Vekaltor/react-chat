import { createGlobalStyle } from "styled-components";
import { fontFaces } from "./Fonts.module";
export const GlobalStyles = createGlobalStyle`

${fontFaces}

:root{
  --darkBlue: #1e70cd;
  --lightBlue: #309ad0;
  --darkRed: #741c28;
  --lightRed: #f02036;
  --aqua: #4eb0b1;
}


:root{
  //Dark Theme
  --darkPrimary: #191a1c;
  --darkSecond: #17181a;
  --white: #f1f1f1;
  --lightGrey: #747577;
  --darkGrey: #202123;
  --lightPourple: #7739fe;
  --darkPourple: #6232cd; 
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Asap', sans-serif;
  font-family: 'Inter', sans-serif; 
}

body {
  text-rendering: optimizeSpeed;
  line-height: 1;
  font-size: 1rem;
  overflow: hidden;
}

#root{
  min-height: 100vh;
  max-height: 100vh;
}

button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  cursor: pointer;
}

ul[role="list"],
ol[role="list"] {
  list-style: none;
}

li {
  list-style-type: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}
`;
