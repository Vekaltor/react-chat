import { createGlobalStyle } from "styled-components";
import fontsCss from "./fonts.module.css";

export const GlobalStyles = createGlobalStyle`
 ${fontsCss}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1;
  font-size: 1rem;
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
