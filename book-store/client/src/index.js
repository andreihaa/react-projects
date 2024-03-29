import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './components/context/AuthContext';
import { CartContextProvider } from './components/context/CartContext';
import { FavoriteContextProvider } from './components/context/FavoriteContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <FavoriteContextProvider>
          <App />
        </FavoriteContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
   </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

