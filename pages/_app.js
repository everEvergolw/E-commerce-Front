import React from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: "Poppins", sans-serif;
  }

`;


export default function App({ Component, pageProps }) {
  return (
    
    <>

    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@400;500;600;700&display=swap" rel="stylesheet" />
    </Helmet>

      <GlobalStyles />
     <Component {...pageProps} /> 

    </>
    
    
  
  
  
  
  
  );
}
