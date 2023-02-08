import { createGlobalStyle } from "styled-components";
import { fontFaces } from "./Fonts.module";
export const GlobalStyles = createGlobalStyle`

${fontFaces}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Asap', sans-serif;
}

body {
  overflow-x: hidden;
  text-rendering: optimizeSpeed;
  line-height: 1;
  font-size: 1rem;
  
}

#root{
  min-height: 100vh;
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
