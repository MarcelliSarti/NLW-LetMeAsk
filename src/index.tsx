import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // importa a função App do arquivo app.tsx

import './services/firebase';
import './styles/global.scss';
ReactDOM.render(
  //chama a função app dentro do app.tsx
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // coloca tudo que esá acima dentro dessa div no index.html
);
