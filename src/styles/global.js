import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  body {
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
  }

  #root {
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
  }

`;
