import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    button, a{
        cursor: pointer;
    }

    body {
    overflow-y: scroll;
    }

    ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    }

    html {
    scrollbar-width: none;
    }
`;

export default GlobalStyles;
