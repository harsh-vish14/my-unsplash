import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { UserContextProvider } from './context/context';

ReactDOM.render(
   <UserContextProvider>
    <App />
    </UserContextProvider>
  ,
  document.getElementById('root')
);
