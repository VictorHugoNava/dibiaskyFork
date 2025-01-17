/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/store';
import OperationsPage from './pages/Operations';
import AboutPage from './pages/About';
import ExamplesPage from './pages/Examples';
import HomePage from './pages/Home';
import Logs from './pages/Logs';
import Subscriptions from './pages/Subscriptions';
import { setupAmplify } from './utils/amplify';

Amplify.configure(awsExports);
setupAmplify();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Subscriptions" element={<Subscriptions />} />
          <Route path="/Operations" element={<OperationsPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Examples" element={<ExamplesPage />} />
          <Route path="/Logs" element={<Logs />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
