import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase/firebaseConfig';

ReactDOM.render(
   <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
   </FirebaseAppProvider>,
  document.getElementById('root')
);
document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
