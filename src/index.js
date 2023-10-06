import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ModalProvider } from "./context/Modal";
import { ParametersProvider } from './context/Parameters';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ParametersProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ParametersProvider>
  </BrowserRouter>
);
