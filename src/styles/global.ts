import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }
    
    *, *::after, *::before {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }
    body {
        font-family: sans-serif;
        overflow-y: hidden;
        font-family: 'Montserrat', sans-serif;
    }
`;
