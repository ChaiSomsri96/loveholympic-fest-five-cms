import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #222d32;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-right: 0 !important;
  }

  @font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), url('assets/fonts/Montserrat/Montserrat-Black.tff') format("truetype");
    font-weight: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: local('Roboto'), url('assets/fonts/Roboto/Roboto-Black.tff') format("truetype");
    font-weight: normal;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
    
    display: flex;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  a {
    color: #212529;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
