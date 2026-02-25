// GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  lightMode: string;
  darkMode: string;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  :root {
    ${({ lightMode }) => lightMode}
  }

  :root[data-color-mode="d"] {
    ${({ darkMode }) => darkMode}
  }

  body {
    background: var(--addifect-color-background);
    color: var(--addifect-color-text);
    font-family: var(--addifect-font-body);
    margin: 0;
    padding: 0;
  }

  /* Additional global styles */
`;

export default GlobalStyle;
