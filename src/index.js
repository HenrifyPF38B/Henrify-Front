import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PlaylistProvider } from './contexts/playlistContext';
import { Provider } from "react-redux";
import Store from "./redux/Store"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={Store}>
      <BrowserRouter>
        <PlaylistProvider>
          <GoogleOAuthProvider clientId='948566626688-hmq1k2d891lppkarlo1bt8pkrtv72k2u.apps.googleusercontent.com'>
            <PayPalScriptProvider options={{
              "client-id": "Ad7WNItmuBn4ealmFHbGctFRd3eOmiqHpTuhpNjw44ryXmACwZypE9gIo4fBPmtvaO0ff6iIUIoE00sM"
            }}>
              <App />
            </PayPalScriptProvider>
          </GoogleOAuthProvider>
        </PlaylistProvider>
      </BrowserRouter> 
     </Provider>
  )
  



// NACHO INSERT PWA

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
