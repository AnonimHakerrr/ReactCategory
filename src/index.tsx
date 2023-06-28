import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import jwtDecode from 'jwt-decode';
import { AuthUserActionType, IUser } from './components/auth/types';
import http from './http';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
if(localStorage.token) {
  const user = jwtDecode(localStorage.token) as IUser;
  http.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
  store.dispatch({
      type: AuthUserActionType.LOGIN_USER, payload: {
          email: user.email,
          name: user.name
      }
  });
}
root.render(
<Provider store={store}>
  <BrowserRouter>
  <App/>
  </BrowserRouter></Provider>
);
 
reportWebVitals();
