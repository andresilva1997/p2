import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider} from "react-intl";
import TableList from "./components/tableList";
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Esp from "./language/esp.json";
import Eng from "./language/eng.json";
import 'bootstrap/dist/css/bootstrap.min.css';

const language = window.navigator.language || navigator.browserLanguage;
// const language = "es"
ReactDOM.render(
    <IntlProvider locale={language} messages={language.startsWith("es") ? Esp : Eng}>
      <TableList />
    </IntlProvider>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
