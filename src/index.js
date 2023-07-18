import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PlaylistProvider } from './contexts/playlistContext';
import { Provider } from "react-redux";
import { reduxStore }  from "./reduxStore"

ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={reduxStore}>
      <BrowserRouter>
        <PlaylistProvider>
          <App />
        </PlaylistProvider>
      </BrowserRouter> 
     </Provider>
  )
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
