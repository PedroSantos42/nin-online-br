import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ========== FONTE NARUTO ========== */
  @font-face {
    font-family: 'Naruto';
    src: url('/fonts/njnaruto.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0B0E14;
    color: #f0f0f0;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  /* Aplica a fonte Naruto em títulos e elementos com classe .title-font */
  h1, h2, h3, .title-font {
    font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
    letter-spacing: 0.5px;
  }

  /* Scrollbar estilizada (opcional) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0B0E14;
  }
  ::-webkit-scrollbar-thumb {
    background: #2A3A4A;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #00BFFF;
  }
`;

export default GlobalStyles;