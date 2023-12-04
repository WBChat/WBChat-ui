import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  font-family: Roboto;
  color: white;
}
button {
  white-space: nowrap;
  min-width: fit-content !important;
}


* {
  ::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.6);
  }
}

a {
  text-decoration: none;
}
`
